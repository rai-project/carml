import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import "./ImageEnhancement.scss";
import SingleColumnImageOutput from "../_Common/components/SingleColumnImageOutput";
import ImageEnhancementImage from "./ImageEnhancementImage";

export default function ImageEnhancement(props) {
  const {getBlock} = useBEMNaming('image-enhancement');


  return <div className={getBlock()}>

    <SingleColumnImageOutput
      modelId={props.trial.model.id}
      duration={props.trial.results.duration}
      image={<ImageEnhancementImage input={props.trial.inputs[0].src}
                                    feature={props.trial.results.responses[0].features[0]}/>}

    />


  </div>
}
