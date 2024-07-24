import React from 'react';
import useBEMNaming from "../../../common/useBEMNaming";
import ImageEnhancementImage from "../../Experiment/QuickOutput/Outputs/ImageEnhancement/ImageEnhancementImage";
import "./ImageEnhancementSummary.scss";

export default function ImageEnhancementSummary(props) {
  const {getBlock, getElement} = useBEMNaming("image-enhancement-summary");

  return <div className={getBlock()}>
    <div className={getElement("summary")}>
      <div className={getElement("summary__content")}>
        <ImageEnhancementImage input={props.trial.inputs[0]["src"]} feature={props.trial.results.responses[0].features[0]}/>
      </div>
    </div>
  </div>
}
