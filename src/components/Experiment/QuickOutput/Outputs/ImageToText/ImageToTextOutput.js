import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";
import ImageToTextOutputInputSection from "./ImageToTextOutputInputSection";
import { TextOutputBox } from "../Text/TextOutputBox";
import { imageToText } from "../../../../../helpers/TaskIDs";

export default function ImageToTextOutput(props) {
    const { getBlock } = useBEMNaming("image-to-text-output");
    const { output, inferenceDuration, input, setInput } = useTextOutput(
        props.trial
    );

    const onSubmit = () => {
        props.onSubmit(input);
    };

    return (
        <div className={getBlock()}>
            <ImageToTextOutputInputSection 
                input={input}
                setInput={setInput}
                onSubmit={onSubmit}        
            />

        <TextOutputBox duration={inferenceDuration} output={output} task={imageToText} />
        </div>
    );
}
