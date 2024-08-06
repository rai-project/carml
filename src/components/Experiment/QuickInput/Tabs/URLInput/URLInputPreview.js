import React from 'react';
import useBEMNaming from '../../../../../common/useBEMNaming';
import "./URLInputPreview.scss";
import { TaskInputTypes } from '../../../../../helpers/TaskInputTypes';
import CanvasInput from '../CanvasInput/CanvasInput';

const URLInputPreview = (props) => {
    const { getBlock, getElement } = useBEMNaming("url-inputs-preview");
    const { task, index } = props

    const inputType = task.useMultiInput ? task.inputs[index].inputType : task.inputType;

    return (
        <>
            {!(props.selectedInputs.length === 0 || props.selectedInputs[0] === "") && props?.inputPreviewProps?.URLValidity && 
                <div className={getBlock()}>
                    <h3 className={getElement("title")}> Input Preview</h3>
                    <div className={getElement("preview")}>
                        { inputType === TaskInputTypes.Image ? 
                            (
                              <img src={props?.inputPreviewProps?.selectedInputSrc} alt="Preview" className={getElement("img")} />
                            ) : inputType === TaskInputTypes.Audio ? 
                            (
                                <audio controls src={props?.inputPreviewProps?.selectedInputSrc} title="Preview" className={getElement("audio")} />
                            ) : inputType === TaskInputTypes.Video ? 
                            (
                                <video src={props?.inputPreviewProps?.selectedInputSrc} controls className={getElement("video")} />
                            ) : inputType === TaskInputTypes.ImageCanvas ?
                            (
                                 <CanvasInput selectInput={props.inputSelected} index={index} url={props?.inputPreviewProps?.selectedInputSrc} {...props} />                                
                            ) : 
                            (
                                <p>Preview not supported for {inputType}</p>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default URLInputPreview;