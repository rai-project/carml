import React from 'react';
import "./SampleInputsTab.scss";
import Task from "../../../../../helpers/Task";
import useSampleInputControl from "./useSampleInputControl";
import useBEMNaming from "../../../../../common/useBEMNaming";
import {QuickInputType} from "../../quickInputType";

export default function SampleInputsTab(props) {
    // Note: This is the content for the Sample Input Tab, below the header

    const {getBlock, getElement} = useBEMNaming("sample-inputs");
    const {isUnselected, isSelected, selectInput, type} = useSampleInputControl(props);

    const getInputClassName = (url) => {
        let className = `input-${type}`;
        if (isSelected(url)) className += ` ${className}--selected`;
        if (isUnselected(url)) className += ` ${className}--unselected`;

        return className;
    }

    const makeSampleInput = (url, index) => {
        switch (props.type) {
            case QuickInputType.Image:
                return makeSampleImageInput(url, index);
            case QuickInputType.Text:
                return makeSampleTextInput(url, index);
            case QuickInputType.Audio:
                return makeSampleAudioInput(url, index);
            default:
                return makeDefaultErrorInput();
        }
    }

    // TODO: Rename "url" to "input" or similar
    function makeSampleImageInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <img src={url.src} alt={url.alt}/>
            </button>
        )
    }

    function makeSampleTextInput(text, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(text))}>
                <div>{text}</div>
            </button>
        )
    }

    function makeSampleAudioInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                 <div>{url.title}</div>
                 <audio controls src={url.src} />
            </button>
        )
    }

    function makeDefaultErrorInput() {
        return (
            <div>No input type defined</div>
        )
    }

    const task = Task.getStaticTask(props.task);
    // Currently using both new and old way of handling inputs but should refactor in the future
    const sampleInputs = task.useMultiInput ? props.sampleInputs[props.inputIndex] : (props.sampleInputs ?? []);
    const inputText = task.inputText || props.input.inputText;

    return (
        <div className={getBlock()}>
            <div className={getElement('title')}><b>{makeTaskTitle(props)}</b> to {inputText.toLowerCase()}</div>
            <div className={getElement('list')}>
                {sampleInputs.map(makeSampleInput)}
            </div>
        </div>
    );

    function makeTaskTitle(props) {
        switch (props.type) {
            case QuickInputType.Image:
                return `Select an image${!props.multiple ? "" : " or set of images"}`;
            case QuickInputType.Text:
                return "Select text";
            case QuickInputType.Audio:
                return "Select an audio file";
            default:
                return "Error: no input type set";
        }
    }
}
