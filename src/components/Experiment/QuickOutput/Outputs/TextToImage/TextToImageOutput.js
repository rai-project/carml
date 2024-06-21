import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";

import { ImageOutputBox } from "./ImageOutputBox";
import TextOutputInputSection from "../Text/TextOutputInputSection";

import { textToImage } from "../../../../../helpers/TaskIDs";
export default function TextToImageOutput(props) {
    const { getBlock } = useBEMNaming("text-to-image-output");

    // Note: This method could probably be renamed to a more generic 'useOutput' or similar?
    const { inferenceDuration, input, setInput } = useTextOutput(
        props.trial
    );

    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const onSubmit = () => {
        props.onSubmit(input);
    };

    return (
        <div className={getBlock()}>
            <TextOutputInputSection
                input={input}
                setInput={setInput}
                onSubmit={onSubmit}
            />
            <ImageOutputBox duration={inferenceDuration} output={output} task={textToImage} />
        </div>
    );
}
