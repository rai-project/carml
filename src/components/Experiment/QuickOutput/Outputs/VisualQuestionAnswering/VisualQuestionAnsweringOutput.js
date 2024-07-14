import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { visualQuestionAnswering } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";


import "./VisualQuestionAnsweringOutput.scss";
import { TextOutputBox } from "../Text/TextOutputBox";


export default function VisualQuestionAnsweringOutput(props) {
    const { getElement, getBlock } = useBEMNaming('visual-question-answering');

    const task = Task.getStaticTask(visualQuestionAnswering);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const duration = props.trial?.results?.duration_for_inference ?? "0s";
    console.log("output", output);

    return (
        <div className={getBlock()}>
            <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} />

            <TextOutputBox output={output.text} duration={duration} task={task} />
        </div>


    );
}
