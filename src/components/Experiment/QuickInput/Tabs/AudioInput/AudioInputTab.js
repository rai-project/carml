import React from "react";
import "./AudioInputTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";
import AudioRecorder from "./AudioRecorder";

export default function AudioInputTab(props) {
    const {getBlock, getElement} = useBEMNaming('audio-input');
    const task = Task.getStaticTask(props.task);

    return (
        <div className={getBlock()}>
            <div className={getElement("title")}>
                <b>Record audio with your microphone</b> to {task.inputText.toLowerCase()}
            </div>
            <AudioRecorder />
        </div>
    );
}