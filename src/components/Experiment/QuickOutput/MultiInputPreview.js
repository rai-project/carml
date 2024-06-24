import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";

import "./MultiInput.scss";

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
        return <p className={getElement("text")}>{input}</p>;
      case "image":
        return (
          <img className={getElement("image")} src={input.src} />
        );
      case "audio":  // Currently not being used
      default:
        return (
            <p className={getElement("error")}>Unable to display input</p>
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
            props.inputs.length > 2 ? (
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
            ) : (
              <div>
                {
                    props.inputs.map((input, index) => (
                        <div className={getElement("single-input")} key={index}>
                            {getInputs(input)}
                        </div>

                    )
                )}
              </div>
            )
          }
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
