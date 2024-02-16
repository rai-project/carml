import React from "react";
import "./AudioInputTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
// import useTextInputControl from "./useTextInputControl";

export default function AudioInputTab(props) {
    const {getBlock, getElement} = useBEMNaming('audio-input');
    // const {task, text, textChanged} = useTextInputControl(props);
    console.log(props)

    return (
        <div className={getBlock()}>
            <div className={getElement("title")}>
                <b>Record audio</b>
                {/* <b>Record audio</b> to {task.inputText} */}
            </div>
            {/* <textarea
                value={text}
                className={getElement("input")}
                onChange={(e) => textChanged(e)}
            ></textarea> */}
        </div>
    );
}