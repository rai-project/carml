import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { documentQuestionAnswering } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import { TextOutputBox } from "./TextOutputBox";

import "./DocumentQuestionAnsweringOutput.scss"


export default function DocumentQuestionAnsweringOutput(props) {
    const { getElement, getBlock } = useBEMNaming('document-question-answering');

    const task = Task.getStaticTask(documentQuestionAnswering);

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

                <TextOutputBox duration={duration} output={output} />
                    <Rating />                 
                </div>
            </div>
        
    )
}
