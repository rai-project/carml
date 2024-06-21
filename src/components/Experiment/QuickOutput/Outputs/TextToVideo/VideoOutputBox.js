import useBEMNaming from "../../../../../common/useBEMNaming";
import OutputDuration from "../_Common/components/OutputDuration";
import Rating from "../Classification/Rating";
import React from "react";
import Task from "../../../../../helpers/Task";
import { textToVideo } from "../../../../../helpers/TaskIDs";
import ReactPlayer from 'react-player';

export function VideoOutputBox(props) {
  const { getElement } = useBEMNaming("text-to-video-output");
  const task = props.task ? Task.getStaticTask(props.task) : Task.getStaticTask(textToVideo);

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
        <div className="output-video-content video-container">

          <ReactPlayer url={props.output.src} controls={true} />
        </div>
      </div>

      <Rating />
    </div>
  );
}
