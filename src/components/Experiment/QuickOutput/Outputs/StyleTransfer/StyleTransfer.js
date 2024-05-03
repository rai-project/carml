import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
// import OutputDuration from "./OutputDuration";
import "./StyleTransfer.scss";
import "../ImageEnhancement/ImageEnhancement.scss"
import SingleColumnImageOutput from "../_Common/components/SingleColumnImageOutput";
import ImageEnhancementImage from "../ImageEnhancement/ImageEnhancementImage";
import { TestStyleTransferOutput } from "./testData/testStyleTransferOutput";
import Task from "../../../../../helpers/Task";
import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";

export default function StyleTransfer(props) {
    console.log('StyleTransfer props', props)
    const {getElement, getBlock} = useBEMNaming('style-transfer');
    const task = Task.style_transfer;

    const inputs = TestStyleTransferOutput.inputs;
    console.log(inputs)
    const output = TestStyleTransferOutput.results.responses[0].features[0];

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
                        <OutputDuration duration={props.duration}/>
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
