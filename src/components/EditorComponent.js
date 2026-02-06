import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorComponent = ({
  value = "",
  setValue,
  status
}) => {
  return (
    <div
      style={{
        minHeight: "15rem",
        border: status === "error" ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
        borderRadius: "6px"
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          toolbar: [
            "heading", "|",
            "bold", "italic", "underline", "strikethrough", "|",
            "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "|",
            "alignment", "|",
            "numberedList", "bulletedList", "outdent", "indent", "|",
            - "link", "blockQuote", "insertTable", "mediaEmbed", "imageUpload", "|",
            + "link", "blockQuote", "insertTable", "mediaEmbed", "|",
            "undo", "redo", "code", "codeBlock"
          ],
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells"
            ]
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue?.(data);
        }}
        onReady={(editor) => {
          editor.ui.view.editable.element.style.minHeight = "15rem";
        }}
        onFocus={(event, editor) => {
          editor.ui.view.editable.element.style.minHeight = "15rem";
        }}
        onBlur={(event, editor) => {
          editor.ui.view.editable.element.style.minHeight = "15rem";
        }}
      />
    </div>
  );
};

export default EditorComponent;