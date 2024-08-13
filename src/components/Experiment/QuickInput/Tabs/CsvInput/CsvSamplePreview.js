import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import useBEMNaming from "../../../../../common/useBEMNaming";
import sampleCsv from '../../../../../resources/taskSample/tableEditing.csv'; 

import "./CsvInput.scss";

export default function CsvSamplePreview(props) {
    const url = props.url;

    const { getElement, getBlock } = useBEMNaming('csv-input-preview');

    // const [csvHeaders, setCsvHeaders] = useState([]);
    const [csvData, setCsvData] = useState([]);

    const config = {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            // console.log('results', results);

            if (results.errors.length === 0) {       
                let data = results.data;
                // setCsvHeaders(data.splice(0, 1));
                setCsvData(data);
                // console.log('csvData', csvData)
            } else {
                console.log('There was an error with the csv...')
            }
        }
    }    

    useEffect(() => {
        Papa.parse(sampleCsv, config);
    }, [])

    useEffect(() => {
        // console.log(csvHeaders);
        // console.log(csvData)
    }, [csvData])

    return (
        <div className={getBlock()}>
            <div>
                { csvData.length > 0 ? (
                    <div className={getElement("table")}>
                        <div className={getElement("header")}>
                            { Object.keys(csvData[0]).map((header, index) => {
                                return (
                                    <div className={getElement("cell")} key={`column-${index}`}>
                                        {header}
                                    </div>
                                )
                            })}
                        </div>
                        { csvData.map((item, index) => {
                            return (
                                <div className={getElement("row")} key={`row-${index}`}>
                                    { Object.entries(item).map(([key, val], index) => {
                                        // console.log(val)
                                        const cellText = !(val instanceof Date) ? val : val.toDateString();
                                        return (
                                                <div className={getElement("cell")} key={`column-${key}`}>
                                                    <div className={getElement("cell-text")}>
                                                        {cellText}
                                                    </div>
                                                    <div className={getElement("cell-tooltip")}>
                                                        <span className="tooltip-text">
                                                            {cellText}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            )
                            
                        })}
                    </div>
                ) : (
                    <div>
                        Loading csv data...
                    </div>
                )}
            </div>
        </div>
    )
}