import React from 'react';
import TopPrediction from "../Classification/TopPrediction";
import "../Classification/ClassificationOutput.scss";
import PredictionExpander from "../../../../Common/PredictionExpander";
import NoPredictions from "../_Common/components/NoPredictions";
import Task from "../../../../../helpers/Task";
import OutputDuration from "../_Common/components/OutputDuration";
import DurationConverter from "../_Common/utils/DurationConverter";
import useBEMNaming from "../../../../../common/useBEMNaming";

const defaultProps = {
    className: "audio-classification-output",
    features: []
};

export default function AudioClassificationOutput(givenProps) {
    const props = { ...defaultProps, ...givenProps };
    const { getBlock, getElement } = useBEMNaming(props.className);
    const task = Task.audio_classification;
    if (props?.trial?.results?.responses[0]?.features) {
        props.features = props?.trial.results.responses[0].features;
    }

    const getPredictionBody = () => {
        if (props.features.length > 0)
            return <div className={getElement('predictions')}>
                <TopPrediction hideRating={props.hideRating} feature={props.features[0]} />
                <PredictionExpander predictions={props.features} />
            </div>;

        return <NoPredictions modelId={props.modelId} />;
    };
    return (
        <>
            
            <div className={getBlock()}>
                <div className={getElement("title-row")}>
                    <h3 className={getElement('title')}>Output</h3>
                    {!props.hideDuration &&
                        <OutputDuration duration={DurationConverter(props.trial.results.duration)} />
                    }
                </div>
                <div className={getElement('subtitle')}>{task.outputText}
                </div>
                {getPredictionBody()}
            </div>
        </>
    );
}