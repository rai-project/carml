import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { textGuidedImageToImage } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";

import "./TextGuidedImageToImageOutput.scss"


export default function TextGuidedImageToImageOutput(props) {
    const { getElement, getBlock } = useBEMNaming('text-guided-image-to-image');

    const task = Task.getStaticTask(textGuidedImageToImage);

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
