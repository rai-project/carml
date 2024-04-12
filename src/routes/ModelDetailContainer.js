import React, {useEffect, useState} from "react";
import ModelDetailPage from "../components/ModelDetailPage/ModelDetailPage"
import {withRouter} from "react-router-dom";
import GetApiHelper from "../helpers/api";

let experimentSubscription = null;
let trialSubscription = null;
let modelSubscription = null;
let api = GetApiHelper();

export function ModelDetailContainer(props) {
    const [model, setModel] = useState(null);
    const [experiment, setExperiment] = useState(null);
    const [trialOutput, setTrialOutput] = useState(undefined);

    console.log("ModelDetailContainer")

    let {modelId, experimentId} = props.match.params;

    const backToModel = () => {
        props.history.push(`/model/${modelId}`);
    }

    const runModel = async (inputUrl, context=null) => {
        // Note: Adding context param for Conversation task; unsure if needed here
        // Check and confirm later - Alex, 4/10/2024
        const response = await api.runTrial(model, inputUrl, context);
        props.history.push(`/model/${modelId}/experiment/${response.experimentId}`);
    }

    const compareModels = () => {
        props.history.push(`/experiment/${experiment.id}`);
    }

    const getTrial = async (trialId) => {
        trialSubscription = api.getTrial(trialId).subscribe({
            next: nextTrialOutput => setTrialOutput(nextTrialOutput)
        });
    }

    const getExperiment = async (experimentId) => {
        experimentSubscription = api.getExperiment(experimentId).subscribe({
            next: nextExperiment => {
                getTrial(nextExperiment.trials[0].id);
                setExperiment(nextExperiment);
            }
        });
    }

    const getModel = () => {
        modelSubscription = api.ActiveModel.subscribe({
            next: (nextModels) => {
                setModel(nextModels[0]);
            }
        });
        api.getModel(modelId);
    }

    useEffect(() => {
        if (!!experimentId)
            getExperiment(experimentId);

        return () => {
            if (experimentSubscription)
                experimentSubscription.unsubscribe();
        }
    });

    useEffect(() => {
        getModel();

        return () => {
            if (modelSubscription)
                modelSubscription.unsubscribe();
        }
    }, []);

    useEffect(() => {
        return () => {
            if (trialSubscription)
                trialSubscription.unsubscribe();
        }
    }, []);

    return (
        <ModelDetailPage model={model} onBackToModelClicked={backToModel}
                         onRunModelClicked={runModel} trialOutput={trialOutput}
                         compare={compareModels}/>
    )
}

export default withRouter(ModelDetailContainer);
