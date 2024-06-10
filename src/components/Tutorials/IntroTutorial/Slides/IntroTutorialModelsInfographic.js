import React from 'react';
import useBEMNaming from "../../../../common/useBEMNaming";
import ModelCard from "../../../ModelList/ModelCard/ModelCard";
import "./IntroTutorialModelsInfographic.scss";
import ExampleModels from "../utils/ExampleModels";

export default function IntroTutorialModelsInfographic(props) {
    const {getElement} = useBEMNaming("intro-tutorial-models-infographic");

    const models = ExampleModels;

    return <>
        <div className={getElement("text-area")}>
            <p className={getElement("intro-text")}>Comparing Models</p>

            <p className={getElement("title")}>
                With so many to models to choose from, modelers can have a hard time finding the best one for their
                purpose.
            </p>
            <button className={getElement("cta")} onClick={() => props.goToSection(props.index + 1)}>
                Let's learn how modelers select a model
            </button>
        </div>
        <div className={getElement("models-area")}>
            {models.map(model => <ModelCard key={`key-${model.id}`} model={model}/>)}
        </div>
    </>
}
