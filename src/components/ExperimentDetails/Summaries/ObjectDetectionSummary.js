import React from 'react';
import useBEMNaming from "../../../common/useBEMNaming";
import useObjectDetectionControl
  from "../../Experiment/QuickOutput/Outputs/ObjectDetection/hooks/useObjectDetectionControl";
import {ObjectDetectionImage} from "../../Experiment/QuickOutput/Outputs/ObjectDetection/ObjectDetectionImage";
import {ObjectDetectionTable} from "../../Experiment/QuickOutput/Outputs/ObjectDetection/ObjectDetectionTable";
import useImageRef from "../../Experiment/QuickOutput/Outputs/ObjectDetection/hooks/useImageRef";

export default function ObjectDetectionSummary(props) {
  const {getBlock, getElement} = useBEMNaming("object-detection-summary");
  const {filter, sections, hover, filteredSections, boundingBox} = useObjectDetectionControl(props);
  const {imageRef, imageHeight} = useImageRef();


  return <div className={getBlock()}>
    <p className={getElement("header")}>Output:</p>

    <div className={getElement("results")}>
      <ObjectDetectionImage img={props.trial.inputs[0].src}
                            filteredSections={filteredSections}
                            hover={hover}
                            confidence={filter.confidence}
                            showInputs
                            sections={sections}
                            labelIsInCategories={filter.labelIsInCategories}
                            imageRef={imageRef}
                            imageHeight={imageHeight}
                            boundingBox={boundingBox}
                            isInstanceSegmentation={props.isInstanceSegmentation}

      />
      <ObjectDetectionTable confidence={filter.confidence} hover={hover} sections={sections} category={filter.category}
                            showPercentages imageHeight={imageHeight}
                            boundingBoxProperty={boundingBox.property}

      />
    </div>
  </div>

}
