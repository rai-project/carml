import React from 'react';
import {Dashboard} from '@uppy/react';
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "./UploadInputsTab.scss";
import Task from "../../../../../helpers/Task";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useUploadInputControl from "./useUploadInputControl";

export default function UploadInputsTab(props) {
  const {getBlock, getElement} = useBEMNaming("upload-inputs");
  const {uppy} = useUploadInputControl(props);

  const task = Task.getStaticTask(props.task);
  const taskName = task.inputType.toLowerCase();

  return (
    <div className={getBlock()}>
      <p className={getElement("help-text")}><b>Upload an {taskName} file</b> to {task.inputText.toLowerCase()} </p>
      <Dashboard uppy={uppy} width={"100%"}/>
    </div>
  );
}

