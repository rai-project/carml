import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";
const defaultProps = {
  className: "input-preview",
  input: "",
  onBackClicked: () => { },
  inputType: "image", // TODO: Change this default?
};

export default function InputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);

  const inputTypes = {
    image: "Image",
    audio: "Audio",
    text: "Text",
    document: "Document",
    video: "Video",
  };


  const getInput = () => {
    switch (props.inputType) {
      case "text":
        return <p className={getElement("text")}>{props.input.src}</p>;
      case "audio":
        return <audio className={getElement("audio")} controls src={props.input.src} />;
      case "image":
        return <img className={getElement("image")} src={props.input.src} />;
      case "video":
        return <video className={getElement("video")} src={props.input.src} controls />;

      default:
        return <p>Not currently supported</p>;
    }
  };

  return (
    <div className={getBlock()}>
      <h3 className={getElement("title")}>
        Input {inputTypes[props.inputType]}
      </h3>
      {getInput()}
      <button
        className={getElement("back-button")}
        onClick={props.onBackClicked}
      >
        Try a different {inputTypes[props.inputType]?.toLowerCase()}
      </button>
    </div>
  );
}
