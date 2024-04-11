import React from "react";
import "./InputPreview.scss";
import useBEMNaming from "../../../common/useBEMNaming";
import ReactPlayer from 'react-player';

const defaultProps = {
  className: "input-preview",
  input: "",
  onBackClicked: () => { },
  inputType: "image", // TODO: Change this default?
};

export default function InputPreview(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getBlock, getElement } = useBEMNaming(props.className);

  const getInput = () => {
    switch (props.inputType) {
      case "text":
        return <p className={getElement("text")}>{props.input}</p>;
      case "video":
        return (
          <ReactPlayer url={props.input} loop={true} controls={true} playing={true} style={{ margin: "20px auto" }} className="video-player" />
        );
      case "audio":  // Currently not being used
      case "image":
      default:
        return <img className={getElement("image")} src={props.input} />;
    }
  };
  const inputKeys = {
    "image": "Image",
    "text": "Text",
    "video": "Video",
  };
  return (
    <div className={getBlock()}>
      <h3 className={getElement("title")}>
        Input {inputKeys[props?.inputType]??"value"}
      </h3>
      {getInput()}
      <button
        className={getElement("back-button")}
        onClick={props.onBackClicked}
      >
        Try a different {(inputKeys[props.inputType]??"value").toLowerCase()}
      </button>
    </div>
  );
}
