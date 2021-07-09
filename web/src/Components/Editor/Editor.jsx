import React, { useRef } from "react";
import PropTypes from "prop-types";

import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";

import Button from "../CustomButtons/Button";
import ElementWrapper from "./ElementWrapper";
import HtmlEditor from "./HtmlEditor";
import { useEffect, useState } from "react";

const swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

export default function Editor({
  documentElements,
  onSave,
  onCancel
}) {
  const [elementIds, setElementIds] = useState([]);
  const [elementMap, setElementMap] = useState({});
  const elementRefs = useRef({});

  const getDocumentElements = () => {
    return elementIds.map(elementId => {
      const element = { ...elementMap[elementId] };

      switch(element.type) {
        case "Html":
          element.content = elementRefs.current[elementId].getContent();
          break;
        case "Images":
          break;
      };
      return element;
    });
  };

  useEffect(() => {
    const order = [];
    const map = {};
  
    if (documentElements) {
      documentElements.forEach(element => {
        order.push(element.id);
        map[element.id] = element;
      });
    }

    setElementIds(order);
    setElementMap(map);
  }, [documentElements]);

  const handleUp = (id) => {
    const ids = [ ...elementIds ];
    for (let i = 1; i < ids.length; i++) {
      if (ids[i] == id) {
        swap(ids, i, i -  1);
      }
    }
    setElementIds(ids);
  };

  const handleDown = (id) => {
    const ids = [ ...elementIds ];
    for (let i = ids.length - 2; i >= 0; i--) {
      if (ids[i] == id) {
        swap(ids, i, i + 1);
      }
    }
    setElementIds(ids);
  };
  
  const elements = elementIds.map((id) => {
    const element = elementMap[id];

    switch(element.type) {
      case "Html":
        return <ElementWrapper key={id} onUp={() => handleUp(id)} onDown={() => handleDown(id)}>
          <HtmlEditor ref={el => elementRefs.current[id] = el} content={element.content} />
        </ElementWrapper>;
      case "Images":
        return <ElementWrapper key={id} onUp={() => handleUp(id)} onDown={() => handleDown(id)}>
          images
        </ElementWrapper>;
    };
  });

  return <>
    {elements}
    <Button
      color="success"
      onClick={() => onSave(getDocumentElements())}
    >
      <SaveIcon /> Save
    </Button>
    <Button color="danger" onClick={onCancel}>
      <ClearIcon /> Discard
    </Button>
  </>
};

Editor.propTypes = {
  documentElements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
