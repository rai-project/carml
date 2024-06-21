import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { textToImage } from "../../../../../helpers/TaskIDs";

export function ImageOutputBox(props) {
  const { getElement } = useBEMNaming("text-to-image-output");
  const task = props.task ? Task.getStaticTask(props.task) : Task.getStaticTask(textToImage);

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
        <div className="output-image-content image-container">
            
          <img src={ props.output.src}/>      
        </div>        
      </div>

      <Rating />
    </div>
  );
}
