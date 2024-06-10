import React from 'react';
import useBEMNaming from "../../../../common/useBEMNaming";
import SnakePlant1 from '../../../../resources/img/snake-plant-1.png';
import SnakePlant2 from '../../../../resources/img/snake-plant-2.png';
import SnakePlant3 from '../../../../resources/img/snake-plant-3.png';
import SnakePlant4 from '../../../../resources/img/snake-plant-4.png';
import OtherPlant1 from '../../../../resources/img/other-plant-1.png';
import OtherPlant2 from '../../../../resources/img/other-plant-2.png';
import OtherPlant3 from '../../../../resources/img/other-plant-3.png';
import OtherPlant4 from '../../../../resources/img/other-plant-4.png';
import {ReactComponent as Background} from "../../../../resources/icons/model-training-background.svg";
import {ReactComponent as MiddleGraphic} from "../../../../resources/icons/model-training-2.svg";
import {ReactComponent as FatArrow} from "../../../../resources/icons/fat-arrow.svg";
import "./IntroTutorialTrainingInfographic.scss";

import {ReactComponent as EndGraphic} from "../../../../resources/icons/model-training-3.svg";

function ImageGroup(props) {
    const {getBlock, getElement} = useBEMNaming("intro-tutorial-training-infographic-image-group");

    return <div className={getBlock() + " " + props.className}>
        {props.images.map(img => <img key={`key-${img}`} src={img} alt={"plant"} className={getElement("img")}/>)}
    </div>
}

export default function IntroTutorialTrainingInfographic(props) {
    const {getElement} = useBEMNaming("intro-tutorial-training-infographic");

    const snakePlantImages = [SnakePlant1, SnakePlant2, SnakePlant3, SnakePlant4];

    const otherPlantImages = [OtherPlant1, OtherPlant2, OtherPlant3, OtherPlant4];


    return <>
        <p className={getElement("intro-text")}>
            Model Training
        </p>
        <p className={getElement("title")}>
            Models require training.
        </p>
        <p className={getElement("sub-title")}>
            Data is fed into models in order to train them, so that they can make accurate predictions.
        </p>

        <div className={getElement("training-graphic")}>
            <div className={getElement("training-graphic-left")}>
                <Background className={getElement("training-graphic-left-background")}/>
                <div className={getElement("training-graphic-left-top-group")}>
                    <p className={getElement("training-graphic-left-text")}>Pictures of Snake Plants</p>
                    <ImageGroup images={snakePlantImages} className={getElement("training-graphic-left-first")}/>
                </div>
                <div className={getElement("training-graphic-left-bottom-group")}>
                    <ImageGroup images={otherPlantImages} className={getElement("training-graphic-left-second")}/>
                    <p className={getElement("training-graphic-left-text")}>Pictures of other plants</p>
                </div>

            </div>
            <div className={getElement("training-graphic-group")}>
                <MiddleGraphic className={getElement("training-graphic-group-img")}/>
                <p className={getElement("training-graphic-group-text")}>
                    Untrained model
                </p>
            </div>
            <FatArrow className={getElement("training-graphic-arrow")}/>
            <div className={getElement("training-graphic-group")}>
                <EndGraphic className={getElement("training-graphic-group-img")}/>
                <p className={getElement("training-graphic-group-text")}>
                    Trained model
                </p>
            </div>
        </div>
        <button className={getElement("cta")} onClick={() => props.goToSection(props.index + 1)}>
            Let’s learn more about models
        </button>
    </>
}
