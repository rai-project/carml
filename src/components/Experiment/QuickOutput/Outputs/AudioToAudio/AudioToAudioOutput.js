import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";

import { AudioOutputBox } from "../TextToAudio/AudioOutputBox";
import AudioToTextOutputInputSection from "../AudioToText/AudioToTextOutputInputSection";


import { audioToAudio } from "../../../../../helpers/TaskIDs";
export default function AudioToAudioOutput(props) {
    const { getBlock } = useBEMNaming("audio-to-audio-output");

    // Note: This method could probably be renamed to a more generic 'useOutput' or similar?
    const { output, inferenceDuration, input, setInput } = useTextOutput(
        props.trial
    );

    const onSubmit = () => {
        props.onSubmit(input);
    };

    return (
        <div className={getBlock()}>
            <AudioToTextOutputInputSection
                input={input}
                setInput={setInput}
                onSubmit={onSubmit}
            />
            <AudioOutputBox duration={inferenceDuration} output={output} task={audioToAudio} />
        </div>
    );
}
