import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";

import { AudioOutputBox } from "./AudioOutputBox";
import TextOutputInputSection from "../Text/TextOutputInputSection";

import { textToAudio } from "../../../../../helpers/TaskIDs";
export default function TextToAudioOutput(props) {
    const { getBlock } = useBEMNaming("text-to-audio-output");

    // Note: This method could probably be renamed to a more generic 'useOutput' or similar?
    const { output, inferenceDuration, input, setInput } = useTextOutput(
        props.trial
    );

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
            <AudioOutputBox duration={inferenceDuration} output={output} task={textToAudio} />
        </div>
    );
}
