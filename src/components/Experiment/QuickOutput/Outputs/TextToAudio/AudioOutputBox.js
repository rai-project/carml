import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { textToText } from "../../../../../helpers/TaskIDs";
import DownloadIcon from "../../../../../resources/icons/icon-download.png"

export function AudioOutputBox(props) {
  const { getElement } = useBEMNaming("text-to-audio-output");
  const task = props.task ? Task.getStaticTask(props.task) : Task.getStaticTask(textToText);


  console.log(props)
  return (
    <div className={getElement("results")}>
      <div className={getElement("title-row")}>
        <h3 className={getElement("title-row-title")}>
            Output
        </h3>
        <OutputDuration duration={props.duration} />
      </div>
      <p className={getElement("subtitle")}>
        {task.outputText}
      </p>
      <div
        className={getElement("output-container output-container-background")}
      >
        <div className="output-audio-content audio-container">
            <audio controls src={props.output.src} />
            <a download={props.output.title} href={props.output.src}>
                <img className="download-audio-icon" src={DownloadIcon} />
            </a>            
        </div>        
      </div>

      <Rating />
    </div>
  );
}
