import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { visualQuestionAnswering } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import { TextOutputBox } from "./TextOutputBox";

import "./VisualQuestionAnsweringOutput.scss";


export default function VisualQuestionAnsweringOutput(props) {
    const { getElement, getBlock } = useBEMNaming('visual-question-answering');

    const task = Task.getStaticTask(visualQuestionAnswering);

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

    );
}
