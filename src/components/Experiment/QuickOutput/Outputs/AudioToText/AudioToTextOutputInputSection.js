import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";

export default function AudioToTextOutputInputSection(props) {
  console.log("AudioToTextOutputInputSection: ", props)

  const { getElement } = useBEMNaming("audio-to-text-output");
  const input = props.input;

  return (
    <div className={getElement("input")}>
      <h3 className={getElement("input-title")}>
        Input Audio
      </h3>

      <div className={getElement("input-audio-content")}>
        <div>
          The uploaded audio file:
        </div>
        <audio controls src={input.src} />
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
