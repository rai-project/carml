import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";

const defaultProps = {
  className: "multi-input-preview",
  inputs: [],
  onBackClicked: () => {},
};

export default function MultiInputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);

  const getInputs = (input) => {
    console.log(input)
    switch (input.inputType) {
      case "text":
        return <p className={getElement("text")}>{input}</p>;
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
