import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";
import { ReactComponent as DocumentIcon } from "../../../resources/icons/icon-document.svg";

const defaultProps = {
  className: "multi-input-preview",
  inputs: [],
  onBackClicked: () => {},
};

export default function MultiInputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);

  const getInputs = (input) => {
    switch (input.inputType) {
      case "text":
        return <p className={getElement("text")}>{input.description}</p>;
      case "document":
        return (<button className={getElement("document")}>
        <DocumentIcon className='icon'/>
        <a href={input.src} target='_blank' >
            <span>{input.description ?? "Document"}</span>
        </a>
    </button>)
      case "audio":  // Currently not being used
      case "image":
      default:
        return (
            <img className={getElement("image")} src={input.src} />
        );
    }
  };

  return (
    <div className={getBlock()}>
        <h3 className={getElement("title")}>
            Inputs
        </h3>
        <div className={getElement("container")}>
            {
                props.inputs.map((input, index) => (
                    <div className={getElement("single-input")} key={index}>
                    {getInputs(input)}
                    </div>
                )
            )}
        </div>

        <button
            className={getElement("back-button")}
            onClick={props.onBackClicked}
        >
            Try different inputs
        </button>
    </div>
  );
}
