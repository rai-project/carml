import React from "react";

import useBEMNaming from "../../../../../common/useBEMNaming";
import Task from "../../../../../helpers/Task";

// import MultiInputPreview from "../../MultiInputPreview";
import Rating from "../Classification/Rating";
import OutputDuration from "../_Common/components/OutputDuration";
import { tableEditing } from "../../../../../helpers/TaskIDs";
import CsvPreview from "../../../QuickInput/Tabs/CsvInput/CsvPreview";
import CsvIcon from "../../../../../../src/resources/icons/icon-csv-file.svg";
// import { tableEditing } from "../../../../../../helpers/TaskIDs";

import "./TableEditing.scss";
import InputPreview from "../../InputPreview";
import { QuickInputType } from "../../../QuickInput/quickInputType";


export default function TableEditingOutput(props) {
    const { getElement, getBlock } = useBEMNaming('table-editing');

    const task = Task.getStaticTask(tableEditing);

    const inputs = props.trial?.inputs ?? [];
    const output = props.trial?.results?.responses[0]?.features[0] ?? {};
    const duration = props.trial?.results?.duration_for_inference ?? "0s";

    console.log('table editing output props', props)

    return (
        <div className={getBlock()}>
            <div className={getElement("header")}>
                <div className={getElement("header-row")}>
                    <h3 className={getElement("header-heading")}>Try This Model</h3>
                </div>
            </div>

            <div className={getElement("content")}>
                <InputPreview onBackClicked={props.onBackClicked} input={inputs} inputType={QuickInputType.Csv} />
                {/* <MultiInputPreview inputs={inputs} onBackClicked={props.onBackClicked} /> */}

                <div className={getElement("output")}>
                    <div className={getElement("output-title-row")}>
                        <h3 className={getElement('title')}>Output</h3>
                        <OutputDuration duration={duration}/>
                    </div>  
                    <p className={getElement("output-subtitle")}>
                        {task.outputText}
                    </p>

                    <CsvPreview url={output.src}/>

                    <div className={getElement("output-download")}>
                        <a 
                            download="output.csv"
                            href={output.src}
                            className={getElement('csv')}
                        >
                            <img src={CsvIcon} alt="download-csv-icon" />
                            <p>Download</p>
                        </a>
                    </div>
                     
                    <Rating />                 
                </div>
            </div>
        </div>
    )
}
