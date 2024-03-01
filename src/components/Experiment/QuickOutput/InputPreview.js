import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";

const defaultProps = {
  className: "input-preview",
  input: "",
  onBackClicked: () => {},
  inputType: "image", // TODO: Change this default?
};

export default function InputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);

  const getInput = () => {
    switch (props.inputType) {
      case "text":
        return <p className={getElement("text")}>{props.input}</p>;
      case "audio":
        // Currently not being used
      case "image":
      default:
        return <img className={getElement("image")} src={props.input} />;
    }
  };

  return (
    <div className={getBlock()}>
      <h3 className={getElement("title")}>
        Input {props.inputType === "image" ? "Image" : "Text"}
      </h3>
      {getInput()}
      <button
        className={getElement("back-button")}
        onClick={props.onBackClicked}
      >
        Try a different {props.inputType === "image" ? "image" : "value"}
      </button>
    </div>
  );
}
