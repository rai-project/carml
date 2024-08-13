import React from 'react';
import "./SampleInputsTab.scss";
import Task from "../../../../../helpers/Task";
import useSampleInputControl from "./useSampleInputControl";
import useBEMNaming from "../../../../../common/useBEMNaming";
import { QuickInputType } from "../../quickInputType";
import { ReactComponent as DocumentIcon } from "../../../../../resources/icons/icon-document.svg";
import { ReactComponent as CsvIcon } from "../../../../../resources/icons/icon-csv-file.svg";
import { imageTo3D } from '../../../../../helpers/TaskIDs';
import URLInputPreview from '../URLInput/URLInputPreview';
import { TaskInputTypes } from '../../../../../helpers/TaskInputTypes';
import CanvasInput from '../CanvasInput/CanvasInput';
import CsvSamplePreview from '../CsvInput/CsvSamplePreview';


export default function SampleInputsTab(props) {
    // Note: This is the content for the Sample Input Tab, below the header
    const { getBlock, getElement } = useBEMNaming("sample-inputs");
    const { isUnselected, isSelected, selectInput, type,  sampleInputType } = useSampleInputControl(props);
    
    const task = Task.getStaticTask(props.task);

    const getInputClassName = (url) => {
        const tasksWithLargeImages = [imageTo3D];
        let className = `input-${sampleInputType}`;
        if (isSelected(url)) className += ` ${className}--selected`;
        if (isUnselected(url)) className += ` ${className}--unselected`;
        if (tasksWithLargeImages.includes(task.id)) className += ` input-${sampleInputType}--large`;

        return className;
    };

    const inputHandlerForPreview = (src) => {
        props?.inputPreviewProps?.setURLValidity(true);
        props?.inputPreviewProps?.setSelectedInputSrc(src);

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
            case QuickInputType.Video:
                return makeSampleVideoInput(url, index);
            case QuickInputType.ImageCanvas:
                return makeSampleImageCanvasInput(url, index);
            case QuickInputType.Csv:
                return makeSampleCsvInput(url, index);
            default:
                return makeDefaultErrorInput();
        }
    };

    const onSampleInputClickPreview = (index, url) => {
        selectInput(index);
        inputHandlerForPreview(url.src);
    };

    // TODO: Should we rename "url" to "input" or similar
    function makeSampleImageInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <img src={url.src} alt={url.description} />
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
                <DocumentIcon className='icon' />
                <a href={url.src} target='_blank' >
                    <span>{url.description ?? "Document"}</span>
                </a>
            </button>
        );
    }

    function makeSampleImageCanvasInput(url, index) {
        return (
            <div key={index} className={getElement(getInputClassName(url))}>
                <CanvasInput selectInput={selectInput} index={index} url={url} {...props} />
            </div>
        );
    }    

    function makeSampleVideoInput(url, index) {
        return (
            <button onClick={() => onSampleInputClickPreview(index, url)} key={index} className={getElement(getInputClassName(url))}>
                <video src={url.src} alt={url.alt} autoPlay muted={true} loop className={getElement("sample-video-content")} />
            </button>
        );
    }

    function makeSampleCsvInput(url, index) {
        return (
            <button onClick={() => selectInput(index)} key={index} className={getElement(getInputClassName(url))}>
                <div className='csv-file-container'>
                    <CsvIcon className='icon' />
                    <a href={url.src} target='_blank' >
                        <span>{url.description ?? "CSV File"}</span>
                    </a>
                </div>

                <CsvSamplePreview url={url.src} />
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
            {sampleInputType === QuickInputType.Video &&
                <URLInputPreview inputPreviewProps={props.inputPreviewProps} inputType={TaskInputTypes.Video} selectedInputs={props.values} />
            }
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
            case QuickInputType.Video:
                return "Select a video";
            case QuickInputType.ImageCanvas:
                return "Draw a rectangle";
            case QuickInputType.Csv:
                return "Select a csv file";
            default:
                return "Error: no input type set";
        }
    }
}
