import React from 'react';
import "./SampleInputsTab.scss";
import Task from "../../../../../helpers/Task";
import useSampleInputControl from "./useSampleInputControl";
import useBEMNaming from "../../../../../common/useBEMNaming";
import { QuickInputType } from "../../quickInputType";
import { ReactComponent as DocumentIcon } from "../../../../../resources/icons/icon-document.svg";
import { imageTo3D } from '../../../../../helpers/TaskIDs';


export default function SampleInputsTab(props) {
    // Note: This is the content for the Sample Input Tab, below the header
    const { getBlock, getElement } = useBEMNaming("sample-inputs");
    const { isUnselected, isSelected, selectInput, type,sampleInputType } = useSampleInputControl(props);
    const task = Task.getStaticTask(props.task);

    const getInputClassName = (url) => {
        const tasksWithLargeImages = [imageTo3D];
        let className = `input-${sampleInputType}`;
        if (isSelected(url)) className += ` ${className}--selected`;
        if (isUnselected(url)) className += ` ${className}--unselected`;
        if (tasksWithLargeImages.includes(task.id)) className += ` input-${sampleInputType}--large`;

        return className;
    };

    const makeSampleInput = (url, index) => {
        switch (sampleInputType) {
            case QuickInputType.Image:
                return makeSampleImageInput(url, index);
            case QuickInputType.Text:
                return makeSampleTextInput(url, index);
            case QuickInputType.Audio:
                return makeSampleAudioInput(url, index);
            case QuickInputType.Document:
                return makeSampleDocumentInput(url, index);
            default:
                return makeDefaultErrorInput();
        }
    };

    // TODO: Rename "url" to "input" or similar
    function makeSampleImageInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <img src={url.src} alt={url.alt} />
            </button>
        );
    }

    function makeSampleTextInput(text, index) {
        return (
            <button onClick={() => { selectInput(index); }} key={index} className={getElement(getInputClassName(text))}>
                <div>{text}</div>
            </button>
        );
    }

    function makeSampleAudioInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <div>{url.filename}</div>
                <audio controls src={url.src} />
            </button>
        );
    }

    function makeSampleDocumentInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <DocumentIcon className='icon'/>
                <a href={url.src} target='_blank' >
                    <span>{url.description ?? "Document"}</span>
                </a>
            </button>
        );
    }

    function makeDefaultErrorInput() {
        return (
            <div>No input type defined</div>
        );
    }

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
        switch (sampleInputType) {
            case QuickInputType.Image:
                return !task.useMultiImageSample ? "Select an image" : "Select a set of images";
            case QuickInputType.Text:
                return "Select text";
            case QuickInputType.Audio:
                return "Select an audio file";
            case QuickInputType.Document:
                return "Select a document";
            default:
                return "Error: no input type set";
        }
    }
}
