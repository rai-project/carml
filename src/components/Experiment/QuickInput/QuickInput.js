import React, { useState } from "react";
import "./QuickImageInput.scss";
import QuickImageInput from "./QuickImageInput";
import QuickTextInput from "./QuickTextInput";
import QuickAudioInput from "./QuickAudioInput";
import Task from "../../../helpers/Task";
import { TaskInputTypes } from "../../../helpers/TaskInputTypes";
// import { TaskControls } from "../../HomePage/TaskControls";
import QuickMultiInput from "./QuickMultiInput";

export default function QuickInput(props) {
  const task = Task.getStaticTask(props.model.output.type);
  const [URLValidity, setURLValidity] = useState(false);
  const [selectedInputSrc, setSelectedInputSrc] = useState("");
  const inputPreviewProps = {
    URLValidity,
    setURLValidity,
    selectedInputSrc,
    setSelectedInputSrc,
  };
  props = { ...props, inputPreviewProps };
  if (task.useMultiInput) {
    // TODO: At some point this should replace the switch statement below
    return <QuickMultiInput {...props} />;
  }

  switch (task.inputType) {
    case TaskInputTypes.Text:
      return <QuickTextInput hideUpload={task.hideUpload} {...props} />;
    case TaskInputTypes.Audio:
      return <QuickAudioInput  {...props} />;
    case TaskInputTypes.Image:
    default:
      return <QuickImageInput {...props} />;
  }
}
