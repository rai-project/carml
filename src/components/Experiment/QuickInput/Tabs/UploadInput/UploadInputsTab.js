import React from 'react';
import {Dashboard} from '@uppy/react';
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "./UploadInputsTab.scss";
import Task from "../../../../../helpers/Task";
import useBEMNaming from "../../../../../common/useBEMNaming";
import { useUploadInputControl } from "./useUploadInputControl";
import { getAllowedFileTypes } from '../../../../../helpers/UppyFileTypeCheckerPlugin';
import { maskGeneration } from '../../../../../helpers/TaskIDs';
import CanvasInput from '../CanvasInput/CanvasInput';
import { QuickInputType } from '../../quickInputType';

export default function UploadInputsTab(props) {
  const {getBlock, getElement} = useBEMNaming("upload-inputs");

  const allowedFileTypes = getAllowedFileTypes(props.task);
  const {uppy} = useUploadInputControl({allowedFileTypes: allowedFileTypes, ...props});

  const task = Task.getStaticTask(props.task);
  const taskName = task.id === maskGeneration ? QuickInputType.Image : (task.useMultiInput ? (Task.getStaticTask(props.task).inputs[props.inputIndex]?.inputType) : props.type)?.toLowerCase();
  const longTaskName = "aeiou".includes(taskName[0]?.toLowerCase()) ? `an ${taskName}` : `a ${taskName}`;

  // Currently using both new and old way of handling inputs but should refactor in the future
  const inputText = task.inputText || props.input.inputText;  

  return (
    <div className={getBlock()}>
      <p className={getElement("help-text")}><b>Upload {longTaskName} file</b> to {inputText.toLowerCase()} </p>
      <Dashboard uppy={uppy} width={"100%"}/>
      {
        (task.id === maskGeneration && props.selectedInputs[props.inputIndex] !== '') && (
          <>
            <CanvasInput selectInput={props.selectInput} index={props.inputIndex} url={props.selectedInputs[props.inputIndex]} {...props} />
          </>
        )
      }
    </div>
  );
}

