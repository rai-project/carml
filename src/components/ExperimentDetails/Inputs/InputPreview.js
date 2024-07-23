import React from "react";
import "./InputPreview.scss";
import { TaskInputTypes } from "../../../helpers/TaskInputTypes";
import Task from "../../../helpers/Task";
import { InputPreviewImage } from "./InputPreviewImage";
import { InputPreviewText } from "./InputPreviewText";

export default function InputPreview(props) {
  const task = props.task ?? Task.image_classification;
console.log("task.inputType", task.inputType)
  if (task.inputType === TaskInputTypes.Text)
    return <InputPreviewText {...props} />;
  
  return <InputPreviewImage {...props} />;
}
