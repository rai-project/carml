import React from 'react';
import "./URLInputsTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import {ReactComponent as PlusSign} from "../../../../../resources/icons/plus-sign.svg";
import useURLInputControl from "./useURLInputControl";


export default function URLInputsTab(props) {
  const {getBlock, getElement} = useBEMNaming("url-inputs");
  const {urlChanged, getUrlValidity, task, values} = useURLInputControl(props);
  const taskName = task.inputType.toLowerCase();
  // console.log("props", props)
  // console.log('URLTab task', task)
  // console.log('URLTab Input', props.input)
  // console.log('URLTab values', values)
  // Note: Currently using both new and old way of handling inputs but should refactor in the future
  const inputText = task.inputText || props.input.inputText;  
  const getInputClassName = (index) => getElement(getUrlValidity(index) ? "url url-error" : "url")

  return (
    <div className={getBlock()}>
      {
        task.useMultiInput ? (
          <>
            <div className={getElement('title')}>
              <b>Copy an {taskName} URL ({taskName} address) and paste</b>
              {" "}to {inputText.toLowerCase()}
            </div>

            <div key={`input-tab-${props.inputIndex}`}>
              <input className={getInputClassName(props.inputIndex)} 
                placeholder={`Paste any ${taskName} URL`} 
                type="url" 
                value={values[props.inputIndex] || ''}
                onChange={(e) => urlChanged(e, props.inputIndex)}
              />
              {getUrlValidity(props.inputIndex) &&
                <p className={getElement("error-text")}>
                  Not a valid URL. Right click on an {taskName} to copy the {taskName}&nbsp;
                  address.
                </p>}
            </div>
          </>
        ) : (
          <>
            <div className={getElement('title')}>
              <b>Copy an {taskName} URL ({taskName} address) and paste</b>
              {" "}to {inputText.toLowerCase()}
            </div>
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
                      Not a valid URL. Right click on an {taskName} to copy the {taskName}&nbsp;
                      address.
                    </p>}
                </div>
              )
            )}
            {props.multiple && <button onClick={props.addInput} className={getElement("add-btn")}><PlusSign
              className={getElement("add-btn-icon")}/> Add another URL</button>}
          </>
        )
      }


    </div>
  );
}

