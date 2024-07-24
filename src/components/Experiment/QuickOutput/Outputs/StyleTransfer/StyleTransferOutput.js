import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { styleTransfer } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";

import "./StyleTransfer.scss";


export default function StyleTransferOutput(props) {
    const { getElement, getBlock } = useBEMNaming('style-transfer');

    const task = Task.getStaticTask(styleTransfer);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const duration = props.trial?.results?.duration_for_inference ?? "0s";


    return (
        <div className={getBlock()}>
            <div className={getElement("header")}>
                <div className={getElement("header-row")}>
                    <h3 className={getElement("header-heading")}>Try This Model</h3>
                </div>
            </div>

            <div className={getElement("content")}>
           
                <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} />

                <div className={getElement("output")}>
                    <div className={getElement("output-title-row")}>
                        <h3 className={getElement('title')}>Output</h3>
                        <OutputDuration duration={duration}/>
                    </div>  
                    <p className={getElement("output-subtitle")}>
                        {task.outputText}
                    </p>
                    <div className={getElement("output-image")}>
                        <img src={output.src} alt={output.alt} />  
                    </div>
                     
                    <Rating />                 
                </div>
            </div>
        </div>
    )
}
