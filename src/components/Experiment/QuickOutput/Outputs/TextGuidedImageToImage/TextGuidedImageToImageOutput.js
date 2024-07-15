import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import { textGuidedImageToImage } from "../../../../../helpers/TaskIDs";

import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";

import "./TextGuidedImageToImageOutput.scss";
import { ImageOutputBox } from "../TextToImage/ImageOutputBox";

export default function TextGuidedImageToImageOutput(props) {
    const { getElement, getBlock } = useBEMNaming('text-guided-image-to-image');

    const task = Task.getStaticTask(textGuidedImageToImage);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const inferenceDuration = props.trial?.results?.duration_for_inference ?? "0s";


    return (
        <div className={getBlock()}>
            <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} />


            <ImageOutputBox output={output} duration={inferenceDuration} task={task} />
        </div>
    );
}