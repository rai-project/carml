import React from "react";
import "./AudioInputTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import AudioRecorder from "./AudioRecorder";

// import useTextInputControl from "./useTextInputControl";

export default function AudioInputTab(props) {
    const {getBlock, getElement} = useBEMNaming('audio-input');
    // const {task, text, textChanged} = useTextInputControl(props);

    // console.log('AudioInputTab', props)
    const task = Task.getStaticTask(props.task);
    // console.log(task)

    return (
        <div className={getBlock()}>
            <div className={getElement("title")}>
                <b>Record audio with your microphone</b> to {task.inputText.toLowerCase()}
            </div>
            {/* <textarea
                value={text}
                className={getElement("input")}
                onChange={(e) => textChanged(e)}
            ></textarea> */}
            <AudioRecorder />
        </div>
    );
}