import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { documentQuestionAnswering } from "../../../../../helpers/TaskIDs";

export function TextOutputBox(props) {
  const { getElement } = useBEMNaming("text-output");
  const task = Task.getStaticTask(documentQuestionAnswering);

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
        <p className={getElement("output-container-text")}>{props.output.text}</p>
      </div>

    </div>
  );
}
