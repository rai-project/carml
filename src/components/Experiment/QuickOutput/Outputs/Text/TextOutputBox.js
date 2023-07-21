import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { text } from "../../../../../helpers/TaskIDs";

export function TextOutputBox(props) {
  const { getElement } = useBEMNaming("text-output");
  const task = Task.getStaticTask(text);

  return (
    <div className={getElement("results")}>
      <div className={getElement("title-row")}>
        <h3 className={getElement("title-row-title")}>Output</h3>
        <OutputDuration duration={props.duration} />
      </div>
      <p className={getElement("subtitle")}>{task.outputText}</p>
      <div className={getElement("output-container")}>
        <p className={getElement("output-container-text")}>{props.output}</p>
      </div>

      <Rating />
    </div>
  );
}
