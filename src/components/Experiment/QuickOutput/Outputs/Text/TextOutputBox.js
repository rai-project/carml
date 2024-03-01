import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { textToText } from "../../../../../helpers/TaskIDs";

export function TextOutputBox(props) {
  console.log("TextOutputBox", props)
  const { getElement } = useBEMNaming("text-output");
  const task = props.task ? Task.getStaticTask(props.task) : Task.getStaticTask(textToText);

  return (
    <div className={getElement("results")}>
      <div className={getElement("title-row")}>
        <h3 className={getElement("title-row-title")}>Output</h3>
        <OutputDuration duration={props.duration} />
      </div>
      <p className={getElement("subtitle")}>{task.outputText}</p>
      <div
        className={getElement("output-container output-container-background")}
      >
        <p className={getElement("output-container-text")}>{props.output}</p>
      </div>

      <Rating />
    </div>
  );
}
