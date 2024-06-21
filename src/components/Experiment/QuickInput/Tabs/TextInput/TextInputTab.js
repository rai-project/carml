import React from "react";
import "./TextInputTab.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextInputControl from "./useTextInputControl";

export default function TextInputTab(props) {
    const { getBlock, getElement } = useBEMNaming('text-input');
    const { task, text, textChanged } = useTextInputControl(props);
    const inputText = (task.inputText.toLowerCase()) || props?.input?.inputText?.toLowerCase();
    return (
        <div className={getBlock()}>
            <div className={getElement("title")}>
                <b>Enter text</b> to {inputText}
            </div>
            <textarea
                value={text}
                className={getElement("input")}
                onChange={(e) => textChanged(e)}
            ></textarea>
        </div>
    );
}