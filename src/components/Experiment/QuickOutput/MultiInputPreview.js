import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";
import { ReactComponent as DocumentIcon } from "../../../resources/icons/icon-document.svg";

import "./MultiInput.scss";

const defaultProps = {
  className: "multi-input-preview",
  inputs: [],
  onBackClicked: () => { },
};

const inputTypes = {
  image: "Image",
  audio: "Audio",
  text: "Text",
};
export default function MultiInputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);
  const getInput = () => {
    switch (props.inputType) {
      case "text":
        return <p className={getElement("text")}>{props.input.src}</p>;
      case "audio":
        return <audio className={getElement("audio")} controls src={props.input.src} />;
      case "image":
        return <img className={getElement("image")} src={props.input.src} />;
      default:
        return <p>Not currently supported</p>;
    }
  };
  const getInputs = (input) => {
    switch (input.inputType) {
      case "TEXT":
        return (
          <p className={getElement("text")}>{input.src}</p>
        );
      case "DOCUMENT":
        return (
          <button className={getElement("document")}>
            <DocumentIcon className='icon' />
            <a href={input.src} target='_blank' >
              <span>{input.description ?? "Document"}</span>
            </a>
          </button>
        );
      case "IMAGE":
        return (
          <img className={getElement("image")} src={input.src} />
        );
      case "AUDIO":  // Currently not being used
      default:
        return (
          <p className={getElement("error")}>Unable to display input</p>
        );
    }
  };

  return (
    <div className={getBlock()}>
      console.log(props.inputs)
      {
        props.inputs.length > 1 ? (
          <div className={getElement("container")}>
            <h3 className={getElement("title")}>
              Inputs
            </h3>
            <div className={getElement("multi-input-grid-display")}>
              <div className={getElement("multi-input-grid-primary-row")}>
                {getInputs(props.inputs[0])}
              </div>
              <div className={getElement("multi-input-grid-secondary-row")}>
                {
                  props.inputs.slice(1).map((input, index) => {
                    return (
                      <div className={getElement("multi-input-grid-item")} key={index}>
                        {getInputs(input)}
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
        ) : (
          <div>
            <h3 className={getElement("title")}>
              Input {inputTypes[props.inputType]}
            </h3>
            {getInput()}
          </div>
        )
      }

      <button
        className={getElement("back-button")}
        onClick={props.onBackClicked}
      >
        Try different inputs
      </button>
    </div>
  );
}
