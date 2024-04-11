import React, { useEffect } from 'react';
import "./URLInputsTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import { ReactComponent as PlusSign } from "../../../../../resources/icons/plus-sign.svg";
import useURLInputControl from "./useURLInputControl";
import { validateURL } from "./useURLInputControl";
import { TaskInputTypes } from '../../../../../helpers/TaskInputTypes';


export default function URLInputsTab(props) {
  const { getBlock, getElement } = useBEMNaming("url-inputs");
  const { urlChanged, getUrlValidity, task, values, } = useURLInputControl(props);
  const taskName = task.inputType.toLowerCase();
  const getInputClassName = (index) => getElement(!isURLEmpty() && getUrlValidity(index) ? "url url-error" : "url");

  const inputHandler = (e, index) => {
    urlChanged(e, index);
    setTimeout(() => {

      if (task.inputType === TaskInputTypes.Video) {
        props.videoInputProps.setURLValidity(!getUrlValidity(0));
        props.videoInputProps.updateSelectedVideoSrc(e.target.value);
      }
    }, 500);

  };

  const isURLEmpty = () => {
    return values.length === 0 || values.every(value => value === "");
  };



  return (
    <div className={getBlock()}>
      <div className={getElement('title')}><b>Copy an {taskName} URL ({taskName} address) and paste</b>
        {" "}to {task.inputText.toLowerCase()}</div>
      {(values).map((value, index) => (
        <div key={`input-tab-${index}`}>
          <input className={getInputClassName(index)} placeholder={`Paste any ${taskName} URL`} type="url" value={value}
            onChange={(e) => inputHandler(e, index)} />
          {!isURLEmpty() && getUrlValidity(index) &&
            <p className={getElement("error-text")}>Not a valid URL. Right click on an {taskName} to copy the {taskName} address.</p>}
        </div>
      )
      )}
      {props.multiple && <button onClick={props.addInput} className={getElement("add-btn")}><PlusSign
        className={getElement("add-btn-icon")} /> Add another URL</button>}
    </div>
  );
}

