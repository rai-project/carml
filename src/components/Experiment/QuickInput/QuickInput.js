import React from "react";
import "./QuickImageInput.scss";
import QuickImageInput from "./QuickImageInput";
import QuickTextInput from "./QuickTextInput";
import QuickAudioInput from "./QuickAudioInput";
import Task from "../../../helpers/Task";
import { TaskInputTypes } from "../../../helpers/TaskInputTypes";
import { TaskControls } from "../../HomePage/TaskControls";
import QuickMultiInput from "./QuickMultiInput";

export default function QuickInput(props) {
  const task = Task.getStaticTask(props.model.output.type)

  // console.log('QuickInput task', task);
  if (task.inputs.length > 1) {
    // TODO: At some point this should replace the switch statement below
    // console.log('QuickInput QuickMultiInput', props)
    return <QuickMultiInput {...props} />
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
