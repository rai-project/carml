import React from "react";
import "./QuickImageInput.scss";
import QuickImageInput from "./QuickImageInput";
import QuickTextInput from "./QuickTextInput";
import QuickAudioInput from "./QuickAudioInput";
import Task from "../../../helpers/Task";
import { TaskInputTypes } from "../../../helpers/TaskInputTypes";

export default function QuickInput(props) {
  const inputType = Task.getStaticTask(props.model.output.type).inputType;
  switch (inputType) {
    case TaskInputTypes.Text:
      return <QuickTextInput {...props} />;
    case TaskInputTypes.Audio:
      return <QuickAudioInput {...props} />;      

    case TaskInputTypes.Image:
    default:
      return <QuickImageInput {...props} />;
  }
}
