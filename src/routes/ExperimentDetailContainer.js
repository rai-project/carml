import React, {useEffect, useState} from "react";
import ExperimentDetailPage from "../components/ExperimentDetails/ExperimentDetailPage";
import GetApiHelper from "../helpers/api";
import Task from "../helpers/Task";
import {image_classification} from "../helpers/TaskIDs";
import MultipleSort from "../helpers/MultipleSort";


export const ExperimentDetailModalTypes = {
    none: "NONE",
    modelCannotBeRemoved: "MODEL_CANNOT_BE_REMOVED",
    confirmDeleteModel: "MODEL_DELETE_CONFIRM",
    inputCannotBeRemoved: "INPUT_CANNOT_BE_REMOVED",
    confirmDeleteInput: "INPUT_DELETE_CONFIRM",
    addInput: "INPUT_ADD"
}

const trialSubscriptions = [];
let experimentSubscription = null;

export default function ExperimentDetailContainer(props) {
    const api = GetApiHelper();

    const [state, updateState] = useState({
        experiment: null,
        trials: [],
        trialToDelete: null,
        trialIsDeleting: false,
        selectedInput: "",
        modalType: ExperimentDetailModalTypes.none
    });

    const setState = (newState) => {
        updateState(s => ({...s, ...newState}));
    }


    const getTask = () => {
        if (state.trials && state.trials.length > 0)
            return Task.getStaticTask(state.trials[0].model.output.type);
        return Task.getStaticTask(image_classification);
    }

    useEffect(() => {
        getExperiment();

        return () => {
            trialSubscriptions.forEach(s => s.unsubscribe());

            if (experimentSubscription)
                experimentSubscription.unsubscribe();
        }
    }, [])

    const getSelectedTrials = () => {
        let filtered = state.trials.filter(trial => trial.inputs[0] === state.selectedInput);

        const sortingOptions = [
            (a) => a.model.name,
            (a) => a.model.framework.name
        ]

        return MultipleSort(filtered, sortingOptions);
    }
    const getInputs = () => {
        return state.trials.filter((t, i, a) => a.findIndex(tr => tr.inputs[0] === t.inputs[0]) === i).map(trial => trial.inputs[0]);
    }
    const makeExperiment = () => {
        return {
            id: state.experiment ? state.experiment.id : null,
            trials: getSelectedTrials(),
        }
    }
    const updateInput = (newInput) => setState({selectedInput: newInput});
    const getTrials = (experiment) => {
        experiment.trials.forEach(trial => {
            addTrial(trial.id);
        })
    }
    const showAddInputModal = () => setState({modalType: ExperimentDetailModalTypes.addInput})
    const showDeleteModal = (trial, modalType) => {
        const isForDeletingModel = modalType === ExperimentDetailModalTypes.confirmDeleteModel;
        const canDelete = isForDeletingModel ? getUniqueModels().length > 1 : getInputs().length > 1;

        if (canDelete) {
            setState({
                trialToDelete: trial,
                modalType: modalType
            });
        } else {
            setState({
                modalType: isForDeletingModel ?
                    ExperimentDetailModalTypes.modelCannotBeRemoved :
                    ExperimentDetailModalTypes.inputCannotBeRemoved
            })
        }
    }
    const cancelDeleteTrial = () => {
        setState({
            trialToDelete: null,
            modalType: ExperimentDetailModalTypes.none
        });
    }
    const getModelOutputType = () => {
        let modelOutputType = "";
        if (state.trials.length > 0)
            modelOutputType = state.trials[0].model.output.type;
        return modelOutputType;
    }
    const getUniqueModels = () => {
        return state.trials.filter((t, i, a) => a.findIndex(tr => tr.model.id === t.model.id) === i).map(trial => trial.model.id);
    }
    const runTrial = async (modelId, input, context=null) => {
        let fauxModel = {id: modelId, output: {type: getModelOutputType()}};

        // Note: Adding context param for Conversation task; unsure if needed here
        // Check and confirm later - Alex, 4/10/2024
        let trial = await api.runTrial(fauxModel, input, state.experiment.id, context);

        addTrial(trial.trialId);
    }
    const addTrial = (trialId) => {
        if (!trialSubscriptions[trialId]) {
            trialSubscriptions[trialId] = api.getTrial(trialId).subscribe({
                next: trialOutput => {
                    const trials = state.trials;
                    const currentIndex = trials.findIndex(t => t.id === trialOutput.id);
                    if (trialOutput.completed_at || currentIndex === -1) {

                        if (currentIndex === -1) {
                            trials.push(trialOutput);
                        } else {
                            trials[currentIndex] = trialOutput;
                        }

                        setState({trials, selectedInput: state.selectedInput || trialOutput.inputs[0]});
                    }

                }
            })
        }
    }
    const hasNoInputs = () => {
        const inputs = getInputs();
        return inputs.length === 0 || inputs[0] === "";
    }
    const addInput = async (input) => {
        let inputs = Array.isArray(input) ? input : [input];

        if (props.addInput) {
            props.addInput(inputs);
            return;
        }


        const models = getUniqueModels();
        const storedInputs = getInputs();
        let modelPromises = [];
        inputs.forEach(input => {
            if (storedInputs.indexOf(input) === -1)
                modelPromises = models.map(model => runTrial(model, input));
        });
        await Promise.all(modelPromises);
        setState({selectedInput: inputs[0]});

        if (hasNoInputs())
            await removeTrials((trial) => !trial.inputs || trial.inputs[0] === "");
    }
    const confirmDeleteModel = async () => {
        setState({trialIsDeleting: true});
        setTimeout(async () => {
            const trial = state.trialToDelete;
            try {
                await removeTrials((t) => t.model.id === trial.model.id);
            } catch (err) {
                console.error(err);
                setState({
                    trialToDelete: null,
                    modalType: ExperimentDetailModalTypes.modelCannotBeRemoved
                });
            }
        }, 500);
    }
    const showDeleteInputModal = (input) => {
        if (getInputs().length > 1) {
            const fauxTrial = {inputs: [input]};
            setState({trialToDelete: fauxTrial, modalType: ExperimentDetailModalTypes.confirmDeleteInput});
        } else {
            setState({modalType: ExperimentDetailModalTypes.inputCannotBeRemoved})
        }

    }
    const deleteInput = async () => {
        setState({trialIsDeleting: true});
        setTimeout(async () => {
            const trial = state.trialToDelete;
            const input = trial.inputs[0];
            try {
                await removeTrials((t) => t.inputs[0] === input);
                if (state.selectedInput === input) {
                    let firstRemainingInput = state.trials.filter(t => t.inputs[0] !== input)[0].inputs[0];
                    setState({
                        selectedInput: firstRemainingInput
                    })
                }
            } catch (err) {
                console.error(err);
                setState({
                    showModelCannotBeRemoved: true,
                    trialToDelete: null
                });
            }
        }, 500)
    }
    const confirmModelCannotBeRemoved = () => {
        setState({
            modalType: ExperimentDetailModalTypes.none
        });
    }
    const getExperiment = async () => {
        if (props.experiment) {
            setState({
                trials: props.experiment.trials,
                experiment: {id: props.experiment.id}
            })
        } else {
            let {experimentId} = props.match.params;
            experimentSubscription = api.getExperiment(experimentId).subscribe({
                next: experiment => {
                    getTrials(experiment);
                    setState({experiment});
                }
            });
        }
    }
    const removeTrials = async (predicate) => {
        const trialsToRemove = state.trials.filter(predicate);
        let promises = trialsToRemove.map(async trial => {
            trialSubscriptions[trial.id].unsubscribe();
            trialSubscriptions[trial.id] = undefined;
            return api.deleteTrial(trial.id);
        });

        await Promise.all(promises);

        setState({
            trials: state.trials.filter((v, i, a) => !predicate(v, i, a)),
            trialToDelete: null,
            modalType: ExperimentDetailModalTypes.none
        });
    }

    return (
        <ExperimentDetailPage experiment={makeExperiment()}
                              onDeleteTrial={showDeleteModal}
                              onCancelDeleteTrial={cancelDeleteTrial}
                              onConfirmDeleteTrial={confirmDeleteModel}
                              trialIsDeleting={state.trialIsDeleting}
                              onConfirmModelCannotBeRemoved={confirmModelCannotBeRemoved}
                              showModelCannotBeRemoved={state.showModelCannotBeRemoved}
                              trialToDelete={state.trialToDelete}
                              inputs={getInputs()}
                              addInput={addInput}
                              updateInput={updateInput}
                              getAddModelsLink={() => `/experiment/${state.experiment?.id}/add-models`}
                              deleteInput={deleteInput}
                              modalType={state.modalType}
                              showAddInputModal={showAddInputModal}
                              selectedInput={state.selectedInput}
                              showDeleteInputModal={showDeleteInputModal}
                              task={getTask()}
        />
    )
}
