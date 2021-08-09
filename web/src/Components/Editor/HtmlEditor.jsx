import React, { useRef, forwardRef, useImperativeHandle } from "react";

import { Editor } from "@tinymce/tinymce-react";

function HtmlEditor(props, ref) {
  const editorRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    getContent() {
      return editorRef.current.getContent();
    }
  }));
  
  /*
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
  */

  return (
    <>
      <Editor
        apiKey="sqau6ebuvggckxhyx0l3duhwl09b56asde48ekeib8119uee"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.content}
        init={{
          height: 500,
          menubar: 'edit insert view format table tools help',
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
          // content_style:
          //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        inline
      />
    </>
  );
};

export default forwardRef(HtmlEditor);
