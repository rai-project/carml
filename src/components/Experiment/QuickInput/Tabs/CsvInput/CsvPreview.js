import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

import useBEMNaming from "../../../../../common/useBEMNaming";
import sampleCsv from '../../../../../resources/taskSample/tableEditing.csv'; 

import "./CsvPreview.scss";

const columnLimit = 10;

export default function CsvPreview(props) {
    const url = props.url;
    console.log('csvPreview url', url)

    const { getElement, getBlock } = useBEMNaming('csv-preview');

    const [csvHeaders, setCsvHeaders] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [isTruncated, setIsTruncated] = useState(false);

    const config = {
        header: true,
        download: true,
        dynamicTyping: true,
        preview: 10,  // Only parse (and display) the first 10 rows of the csv file
        complete: function(results) {
            console.log('results', results);
            const { errors, meta, data } = results;

            if (errors.length > 0) { 
                // Per PapaParse documentation, errors don't necessarily mean that parsing failed
                // https://www.papaparse.com/docs#errors
            }

            const fields = meta.fields;
            setCsvHeaders(fields)

            // console.log('data: ', data)
            setCsvData(data);

            setIsTruncated(meta.truncated || (fields.length > columnLimit));            
        }
    }    

    useEffect(() => {
        // console.log('samplecsv: ', sampleCsv)
        // Papa.parse(sampleCsv, config);

        console.log('urlcsv', url)
        Papa.parse(url, config);
    }, [])

    useEffect(() => {
        console.log('csvHeaders', csvHeaders);
        console.log('csvData', csvData)
    }, [csvData])

    return (
        <div className={getBlock()}>
            <div>
                { csvData.length > 0 ? (
                    <div className={getElement("table")}>
                        <div className={getElement("header")}>
                            {/* { Object.keys(csvData[0]).map((header, index) => { */}
                            { csvHeaders.map((header, index) => {
                                if (index < columnLimit) {
                                    return (
                                        <div className={getElement("cell")} key={`column-${index}`}>
                                            {header}
                                        </div>
                                    )
                                }

                            })}
                        </div>
                        { csvData.map((item, rowIndex) => {
                            return (
                                <div className={getElement("row")} key={`row-${rowIndex}`}>
                                    { Object.entries(item).map(([key, val], colIndex) => {
                                        // console.log(val)
                                        if (colIndex < columnLimit) {
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
                                        }

                                        })
                                    }
                                </div>

                            )
                            
                        })}
                        { isTruncated && (
                            <div className={getElement("row")}>
                                <div className={getElement("truncated")}>
                                    <b>Note:&nbsp;</b>This table has been truncated. 
                                    You can download the full file below.
                                </div>
                            </div>
                        )}
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