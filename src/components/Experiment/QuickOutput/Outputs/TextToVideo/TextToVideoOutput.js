import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";

import { VideoOutputBox } from "./VideoOutputBox";
import TextOutputInputSection from "../Text/TextOutputInputSection";

import { textToVideo } from "../../../../../helpers/TaskIDs";
export default function TextToVideoOutput(props) {
    const { getBlock } = useBEMNaming("text-to-video-output");

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
            <VideoOutputBox duration={inferenceDuration} output={output} task={textToVideo} />
        </div>
    );
}
