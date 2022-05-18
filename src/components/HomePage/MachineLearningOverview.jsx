import useBEMNaming from "../../common/useBEMNaming";
import {HomePageSectionHeading} from "./HomePageSectionHeading";
import React from "react";
import MachineLearning1 from '../../resources/img/machine-learning-1.png';
import MachineLearning2 from '../../resources/img/machine-learning-2.png';
import MachineLearning3 from '../../resources/img/machine-learning-3.png';
import {ReactComponent as Arrow} from "../../resources/icons/fat-arrow.svg";
import "./MachineLearningOverview.scss";

export function MachineLearningOverview() {
  const {getBlock, getElement} = useBEMNaming("machine-learning-overview");

  return <div className={getBlock()}>
    <HomePageSectionHeading title={"What are machine learning models?"}
                            subtitle={"A machine learning model is a file trained to recognize certain patterns. Once trained, a model can be used to make predictions about data it has never seen before, like recognizing what object is in this image."}/>
    <div className={getElement("wrapping-box")}>
      <div className={getElement("background-gradient")}></div>
      <div className={getElement("section-content")}>
        <div className={getElement("content-group")}>
          <img className={getElement("content-image")} src={MachineLearning1} alt={"Input image"}/>
          <p className={getElement("content-label")}>Input image</p>
        </div>
        <div className={getElement("content-group")}>
          <Arrow className={getElement("content-arrow")}/>
          <div></div>
        </div>
        <div className={getElement("content-group")}>
          <img className={getElement("content-image")} src={MachineLearning2} alt={"Trained model"}/>
          <p className={getElement("content-label")}>Trained model</p>
        </div>
        <div className={getElement("content-group")}>
          <Arrow className={getElement("content-arrow")}/>
          <div></div>

        </div>
        <div className={getElement("content-group")}>
          <img className={getElement("content-image")} src={MachineLearning3} alt={"Output"}/>
          <p className={getElement("content-label")}>Output</p>
        </div>
      </div>
    </div>

  </div>
}