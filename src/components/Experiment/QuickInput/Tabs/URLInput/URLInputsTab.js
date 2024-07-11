import React from 'react';
import "./URLInputsTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import { ReactComponent as PlusSign } from "../../../../../resources/icons/plus-sign.svg";
import useURLInputControl from "./useURLInputControl";
import Task from "../../../../../helpers/Task";
import { TaskInputTypes } from '../../../../../helpers/TaskInputTypes';
import URLInputPreview from './URLInputPreview';


export default function URLInputsTab(props) {
  const { getBlock, getElement } = useBEMNaming("url-inputs");
  const { urlChanged, getUrlValidity, task, values } = useURLInputControl(props);
  const taskName = (task.useMultiInput ? (Task.getStaticTask(props.task).inputs[props.inputIndex]?.inputType) : Task.getStaticTask(props.task).inputType || '').toLowerCase();
  const longTaskName = "aeiou".includes(taskName[0]?.toLowerCase()) ? `an ${taskName}` : `a ${taskName}`;
  // Note: Currently using both new and old way of handling inputs but should refactor in the future
  const inputText = task.inputText || props.input.inputText;
  const getInputClassName = (index) => getElement(getUrlValidity(index) ? "url url-error" : "url");

  const inputHandlerForPreview = (e, index) => {
    urlChanged(e, index);
    props?.inputPreviewProps?.setURLValidity(false);

    setTimeout(() => {
      props?.inputPreviewProps?.setURLValidity(!getUrlValidity(0));
      props?.inputPreviewProps?.setSelectedInputSrc(e.target.value);
    }, 500);
  };

  return (
    <div className={getBlock()}>
      <div className={getElement('title')}>
        <b>Copy {longTaskName} URL ({taskName} address) and paste</b>
        {" "}to {inputText.toLowerCase()}
      </div>
      {
        task.useMultiInput ? (
          task.multiple ? (
            <>
              {(values).map((value, index) => (
                <div key={`input-tab-${index}`}>
                  <input className={getInputClassName(index)}
                    placeholder={`Paste any ${taskName} URL`}
                    type="url"
                    value={value}
                    onChange={(e) => urlChanged(e, index)}
                  />
                  {getUrlValidity(index) &&
                    <p className={getElement("error-text")}>
                      Not a valid URL. Right click on {longTaskName} to copy the {taskName}&nbsp;
                      address.
                    </p>}
                </div>
              )
              )}
              <button onClick={props.addInput} className={getElement("add-btn")}>
                <PlusSign className={getElement("add-btn-icon")} />
                Add another URL
              </button>
            </>
          ) : (
            <>
              <div key={`input-tab-${props.inputIndex}`}>
                <input className={getInputClassName(props.inputIndex)}
                  placeholder={`Paste any ${taskName} URL`}
                  type="url"
                  value={values[props.inputIndex] || ''}
                  onChange={(e) => urlChanged(e, props.inputIndex)}
                />
                {getUrlValidity(props.inputIndex) &&
                  <p className={getElement("error-text")}>
                    Not a valid URL. Right click on {longTaskName} to copy the {taskName}&nbsp;
                    address.
                  </p>}
              </div>
            </>
          )
        ) : (
          <>
            {(values).map((value, index) => (
              <div key={`input-tab-${index}`}>
                <input className={getInputClassName(index)}
                  placeholder={`Paste any ${taskName} URL`}
                  type="url"
                  value={value}
                  onChange={(e) => inputHandlerForPreview(e, index)}
                />
                {getUrlValidity(index) &&
                  <p className={getElement("error-text")}>
                    Not a valid URL. Right click on {longTaskName} to copy the {taskName}&nbsp;address.
                  </p>}
              </div>
            )
            )}
            {props.multiple && <button onClick={props.addInput} className={getElement("add-btn")}><PlusSign
              className={getElement("add-btn-icon")} /> Add another URL</button>}
          </>
        )
      }


      <URLInputPreview inputPreviewProps={props.inputPreviewProps} inputType={task.inputType} selectedInputs={props.values} />
    </div>
  );
}

