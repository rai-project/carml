import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";

export default function TextOutputInputSection(props) {
  const { getElement } = useBEMNaming("text-output");

  return (
    <div className={getElement("input")}>
      <h3 className={getElement("input-title")}>Input Text</h3>

      <textarea
        value={props.input.src}
        onChange={(e) => props.setInput(e.target.value)}
        className={getElement("input-container-text")}
      ></textarea>

      <button
        onClick={props.onSubmit}
        className={getElement("input-submit-button")}
      >
        Rerun Model
      </button>
    </div>
  );
}
