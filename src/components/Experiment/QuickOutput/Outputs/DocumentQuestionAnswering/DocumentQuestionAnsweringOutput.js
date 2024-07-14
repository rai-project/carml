import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { documentQuestionAnswering } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";

import "./DocumentQuestionAnsweringOutput.scss";
import { TextOutputBox } from "../Text/TextOutputBox";


export default function DocumentQuestionAnsweringOutput(props) {
    const { getElement, getBlock } = useBEMNaming('document-question-answering');

    const task = Task.getStaticTask(documentQuestionAnswering);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const duration = props.trial?.results?.duration_for_inference ?? "0s";


    return (
        <div className={getBlock()}>
            <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} />

            <TextOutputBox output={output.text} duration={duration} task={task} />
        </div>

    );
}
