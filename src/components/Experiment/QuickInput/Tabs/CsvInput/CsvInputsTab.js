import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import useBEMNaming from "../../../../../common/useBEMNaming";
import sampleCsv from '../../../../../resources/taskSample/tableEditing.csv'; 

import "./CsvPreview";
import "./CsvInputsTab.scss";
import Task from '../../../../../helpers/Task';

import DownloadIcon from "../../../../../resources/icons/icon-download.png"
import CsvIcon from "../../../../../resources/icons/icon-csv-file.svg";


export default function CsvInputsTab(props) {
    // console.log(props)
    const task = Task.getStaticTask(props.task);

    const { getElement, getBlock } = useBEMNaming('csv-inputs');

    const taskName = (task.useMultiInput ? (Task.getStaticTask(props.task).inputs[props.inputIndex]?.inputType) : Task.getStaticTask(props.task).inputType || '').toLowerCase();
    // Note: Currently using both new and old way of handling inputs but should refactor in the future
    const inputText = task.inputText || props.input.inputText;
    
    const csvHeaders = ["a", "b", "c", "d", "e", "f"];
    const emptyCsv = [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ];
    const emptyCsvString = ',,,,,\n,,,,,\n,,,,,\n,,,,,\n,,,,,\n,,,,,';
    
    const [csvData, setCsvData] = useState(emptyCsv);

    useEffect(() => {
        // console.log(csvData)
        const csvString = stringifyCsvData();
        // console.log(csvString)
        // console.log('strings are equal', csvString === emptyCsvString);
        if (csvString !== emptyCsvString) {
            // console.log('select')
            props.inputSelected(csvString, props.inputIndex);
        }
    }, [csvData])    

    const updateCell = (event, rowIndex, colIndex) => {
        // console.log('e', e)
        if (event.persist)
            event.persist();
        // console.log('e val', event.target.value)
        // console.log('row', rowIndex)
        // console.log('col', colIndex)

        let csvCopy =[...csvData];
        csvCopy[rowIndex][colIndex] = event.target.value;
        // console.log(csvCopy)
        setCsvData(csvCopy);
        // Enable Run Model button?
    }

    const stringifyCsvData = () => {
        return csvData.map((row) => row.join(',')).join('\n');
    }

    const downloadCsv = () => {
        console.log('download')
        const fileType = 'text/csv';
        const fileName = 'text-input.csv';
        const csvString = stringifyCsvData();

        const blob = new Blob([csvString], { type: fileType });

        var a = document.createElement('a');
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
    }



    return (
        <div className={getBlock()}>
            <div className={getElement('title')}>
                <b>Manually enter {taskName} contents</b>
                {" "}to {inputText.toLowerCase()}
            </div>
            <div className={getElement('container')}>
                <div className={getElement('csv-header')}>
                    { csvHeaders.map((header) => {
                        return (
                            <div className={getElement('col-header')} key={`row-header-${header}`}>
                                {header}
                            </div>
                        )
                    })}
                </div>

                <div className={getElement('table')}>
                    { csvData.map((row, rowIndex) => {
                        return (
                            <div className={getElement('row')} key={`row-${rowIndex}`}>
                                <p className={getElement('row-label')}>
                                    {rowIndex}
                                </p>

                                { row.map((cell, colIndex) => {
                                    return (
                                        <div className={getElement('cell')} key={`cell-${rowIndex}-${colIndex}`}>
                                            <input
                                                className={getElement('text-input')}
                                                type="text"
                                                value={cell}
                                                onChange={(event) => (updateCell(event, rowIndex, colIndex))}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <button 
                        className={getElement('download-csv-button')}
                        onClick={() => downloadCsv()}>
                        <img src={CsvIcon} alt="download-csv-icon" />
                        <p>Download</p>
                    </button>            
                </div>
            </div>



        </div>
  
    )
}