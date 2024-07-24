import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useObjectDetectionControl from "./hooks/useObjectDetectionControl";
import {ObjectDetectionImage} from "./ObjectDetectionImage";
import {ObjectDetectionTable} from "./ObjectDetectionTable";
import NoPredictions from "../_Common/components/NoPredictions";
import "./ObjectDetection.scss";
import useImageRef from "./hooks/useImageRef";
import Task from "../../../../../helpers/Task";
import OutputDuration from "../_Common/components/OutputDuration";

export default function ObjectDetection(props) {
  const {getElement, getBlock} = useBEMNaming("object-detection");
  const {hover, filteredSections, sections, filter, boundingBox} = useObjectDetectionControl(props);
  const {imageRef, imageHeight} = useImageRef();
  const task = Task.image_object_detection;


  const getBody = () => {
    if (sections.length === 0) return <NoPredictions modelId={props.trial.model.id}/>

    return <div className={getElement("top-row")}>
      <ObjectDetectionImage img={props.trial.inputs[0].src}
                            filteredSections={filteredSections}
                            sections={sections}
                            hover={hover}
                            confidence={filter.confidence}
                            showInputs
                            labelIsInCategories={filter.labelIsInCategories}
                            imageRef={imageRef}
                            imageHeight={imageHeight}
                            isInstanceSegmentation={props.isInstanceSegmentation}
                            boundingBox={boundingBox}
                            hasMask={boundingBox.hasMask}
                            hasBoundingBox={boundingBox.hasBoundingBox}
                            hasContourLines={boundingBox.hasContourLines}

      />
      <ObjectDetectionTable confidence={filter.confidence} sections={sections} category={filter.category}
                            showPercentages hover={hover}
                            imageHeight={imageHeight}
                            boundingBoxProperty={boundingBox.property}

      />
    </div>
  }

  return <div className={getBlock()}>
    <div className={getElement("header")}>
      <div className={getElement("header-row")}>
        <h3 className={getElement("header-headline")}>Output</h3>
        <OutputDuration duration={props.trial.results.duration}/>
      </div>
      <div className={getElement("header-row")}>

        <p className={getElement("header-subheading")}>{task.outputText}</p>

      </div>

    </div>
    {getBody()}
    <div className={getElement("bottom-row")}>
      <button onClick={props.onBackClicked} className={getElement("bottom-row-btn")}>
        Try a different image
      </button>
    </div>
  </div>
}
