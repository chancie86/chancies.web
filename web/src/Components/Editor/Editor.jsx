import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Editor } from "@tinymce/tinymce-react";

import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";

import Button from "../CustomButtons/Button";

// nodejs library that concatenates classes
//import classNames from "classnames";

// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

//const useStyles = makeStyles(styles);

export default function EditorComponent({ content, onSave, onCancel }) {
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        apiKey="sqau6ebuvggckxhyx0l3duhwl09b56asde48ekeib8119uee"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
      <Button
        color="success"
        onClick={() => onSave(editorRef.current.getContent())}
      >
        <SaveIcon /> Save
      </Button>
      <Button color="danger" onClick={onCancel}>
        <ClearIcon /> Discard
      </Button>
    </>
  );
}

EditorComponent.propTypes = {
  content: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
