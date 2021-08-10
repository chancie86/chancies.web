import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";

import { swap } from "../../utils/utils";
import Button from "../CustomButtons/Button";
import AddElementDivider from "./AddElementDivider";
import ElementWrapper from "./ElementWrapper";
import HtmlEditor from "./HtmlEditor";
import ImageElementEditor from "./ImageElementEditor";
import VideoElementEditor from "./VideoElementEditor";

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
        default:
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

  const handleUpElement = (id) => {
    const ids = [ ...elementIds ];
    for (let i = 1; i < ids.length; i++) {
      if (ids[i] === id) {
        swap(ids, i, i -  1);
      }
    }
    setElementIds(ids);
  };

  const handleDownElement = (id) => {
    const ids = [ ...elementIds ];
    for (let i = ids.length - 2; i >= 0; i--) {
      if (ids[i] === id) {
        swap(ids, i, i + 1);
      }
    }
    setElementIds(ids);
  };

  const handleDeleteElement = (id) => {
    const newElementMap = { ...elementMap };
    delete newElementMap[id];

    const index = elementIds.indexOf(id);
    const newElementIds = [ ...elementIds ];
    newElementIds.splice(index, 1);

    setElementIds(newElementIds);
    setElementMap(newElementMap);
  };

  const handleAddElement = (index, element) => {
    const newElementIds = [ ...elementIds ];
    newElementIds.splice(index, 0, element.id);

    const newElementMap = { ...elementMap };
    newElementMap[element.id] = element;

    setElementMap(newElementMap);
    setElementIds(newElementIds);
  };

  const handleAddImage = (element, caption, imagePath) => {
    const newImages = [
      ...element.images,
      {
        path: imagePath,
        title: caption
      }
    ];

    const newElementMap = { ...elementMap };
    newElementMap[element.id] = {
      ...element,
      images: newImages
    };
    
    setElementMap(newElementMap);
  };

  const handleRemoveImage = (index, element) => {
    const newImages = [ ...element.images ];
    newImages.splice(index, 1);

    const newElementMap = { ...elementMap };
    newElementMap[element.id] = {
      ...element,
      images: newImages
    };
    
    setElementMap(newElementMap);
  };

  const handleUpImage = (index, element) => {
    const newImages = [ ...element.images ];
    swap(newImages, index, index - 1);

    const newElementMap = { ...elementMap };
    newElementMap[element.id] = {
      ...element,
      images: newImages
    };
    
    setElementMap(newElementMap);
  };

  const handleDownImage = (index, element) => {
    const newImages = [ ...element.images ];
    swap(newImages, index, index + 1);

    const newElementMap = { ...elementMap };
    newElementMap[element.id] = {
      ...element,
      images: newImages
    };
    
    setElementMap(newElementMap);
  };

  const handleVideoUrlChange = (element, url) => {
    const newElementMap = { ...elementMap };
    newElementMap[element.id] = {
      ...element,
      url
    };
    
    setElementMap(newElementMap);
  };

  const elements = [];

  for (let i = 0; i < elementIds.length; i++) {
    const id = elementIds[i]; 
    elements.push(<AddElementDivider key={`divider-${i}`} index={i} onAdd={handleAddElement} />);

    const element = elementMap[id];

    switch(element.type) {
      case "Html":
        elements.push(<ElementWrapper key={id} onUp={() => handleUpElement(id)} onDown={() => handleDownElement(id)} onDelete={() => handleDeleteElement(id)}>
          <HtmlEditor ref={el => elementRefs.current[id] = el} content={element.content} />
        </ElementWrapper>);
        break;
      case "Images":
        elements.push(<ElementWrapper key={id} onUp={() => handleUpElement(id)} onDown={() => handleDownElement(id)} onDelete={() => handleDeleteElement(id)}>
          <ImageElementEditor
            images={element.images}
            onAdd={(caption, imagePath) => handleAddImage(element, caption, imagePath)}
            onUp={index => handleUpImage(index, element)}
            onDown={index => handleDownImage(index, element)}
            onRemove={index => handleRemoveImage(index, element)}
          />
        </ElementWrapper>);
        break;
      case "Video":
        elements.push(<ElementWrapper key={id} onUp={() => handleUpElement(id)} onDown={() => handleDownElement(id)} onDelete={() => handleDeleteElement(id)}>
          <VideoElementEditor value={element.url} onChange={value => handleVideoUrlChange(element, value)} />
        </ElementWrapper>);
        break;
      default:
        break;
    };
  }

  elements.push(<AddElementDivider key={`divider-${elements.length}`} index={elements.length} onAdd={handleAddElement} />);

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
