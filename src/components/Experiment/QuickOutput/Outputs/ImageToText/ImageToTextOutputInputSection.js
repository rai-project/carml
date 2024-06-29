import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import "./ImageToText.scss"
export default function ImageToTextOutputInputSection(props) {
  const { getElement } = useBEMNaming("image-to-text-output");
  const input = props.input;

  return (
    <div className={getElement("input")}>
      <h3 className={getElement("input-title")}>
        Input Image
      </h3>

      <div className={getElement("input-image-content")}>
        <div>
          The uploaded image file:
        </div>
        <img controls src={input.src}  alt={input.alt} />
      </div>

      <button
        onClick={props.onSubmit}
        className={getElement("input-submit-button")}
      >
        Rerun Model
      </button>
    </div>
  );
}
