import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";
import AudioToTextOutputInputSection from "./AudioToTextOutputInputSection";
// import { TextOutputBox } from "./TextOutputBox";
import { TextOutputBox } from "../Text/TextOutputBox";
// import TextOutputInputSection from "./TextOutputInputSection";

import { audioToText } from "../../../../../helpers/TaskIDs";

export default function AudioToTextOutput(props) {
    console.log("AudioToTextOutput", props)

    const { getBlock } = useBEMNaming("audio-to-text-output");
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

        <TextOutputBox duration={inferenceDuration} output={output} task={audioToText} />
        </div>
    );
}
