import {useEffect, useMemo, useState} from "react";
import clone from "../../../helpers/cloner";
import GetApiHelper from "../../../helpers/api";
import {useRouteMatch} from "react-router-dom";
import MultipleSort from "../../../helpers/MultipleSort";

export const experimentDetailsPages = {
  ComparisonPage: "COMPARISON_PAGE",
  AddModelPage: "ADD_MODEL_PAGE"
}

export default function useExperimentDetailControl() {
  const [experiment, setExperiment] = useState(null);
  const [trials, setTrials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trialToDelete, setTrialToDelete] = useState(null);
  const [trialIsDeleting, setTrialIsDeleting] = useState(false);
  const [showModelCannotBeRemoved, setShowModelCannotBeRemoved] = useState(false);
  const [trialSubscriptions, setTrialSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(experimentDetailsPages.ComparisonPage);

  const getUniqueInputs = useMemo(() => trials.filter((trial, index, array) => array.findIndex(t => t.inputs[0] === trial.inputs[0]) === index).map(trial => trial.inputs[0]), [trials.length]);
  const inputs = MultipleSort(getUniqueInputs, [a => a]);

  const currentInput = inputs[currentIndex];
  let modelOutputType = "";
  if (trials.length > 0)
    modelOutputType = trials[0].model.output.type;

  const {experimentId} = useRouteMatch().params;


  const api = useMemo(() => GetApiHelper(), []);

  const addModel = async (modelId) => {
    inputs.forEach((input) => {
      addTrial(modelId, input);
    })
  }

  function makeExperiment() {
    return {
      id: experiment ? experiment.id : null,
      trials: getSelectedTrials()
    }
  }

  const getUniqueModelIds = () => trials.filter((trial, idx, arr) => arr.findIndex(t => t.model.id === trial.model.id) === idx).map(trial => trial.model.id);

  const getSelectedTrials = () => {
    let modelIds = getUniqueModelIds();
    return modelIds.map(id => {
      return trials.filter(trial => trial.model.id === id && trial.inputs[0] === currentInput)[0];
    }).filter(trial => trial);
  }

  const runTrial = async (modelId, input, context=null) => {
    // Note: Adding context param for Conversation task; unsure if needed here
    // Check and confirm later - Alex, 4/10/2024
    let fauxModel = {id: modelId, output: {type: modelOutputType}};

    let trial = await api.runTrial(fauxModel, input, experimentId, context);

    addTrial(trial.trialId);
  }

  const addTrial = (trialId) => {
    const trialSubs = (trialSubscriptions);

    if (!trialSubs[trialId]) {
      trialSubs[trialId] = api.getTrial(trialId).subscribe({
        next: trialOutput => {

          if (trialOutput.completed_at || trials.findIndex(t => t.id === trialOutput.id) === -1)
            setTrials((state) => {
              const trialClone = clone(state);
              const currentIndex = trialClone.findIndex(t => t.id === trialOutput.id);

              if (currentIndex === -1) {
                trialClone.push(trialOutput);
              } else {
                trialClone[currentIndex] = trialOutput;
              }

              return trialClone;
            });
        }
      });
    }
    setTrialSubscriptions(trialSubs);
  }


  const getTrials = () => {
    experiment.trials.forEach(trial => {
      addTrial(trial.id)
    });
  }

  const showDeleteModal = (trial) => {
    if (trials.length > 1)
      setTrialToDelete(trial);
    else
      setShowModelCannotBeRemoved(true);
  }

  const cancelDeleteTrial = () => setTrialToDelete(true);

  const confirmDeleteTrial = async () => {
    setTrialIsDeleting(true);
    setTimeout(async () => {
      const trialId = trialToDelete.id;
      try {
        await api.deleteTrial(trialId);
        trialSubscriptions[trialId].unsubscribe();
        trialSubscriptions[trialId] = undefined;

        let newTrials = trials.filter(t => t.id !== trialId);

        setTrials(newTrials);
        setTrialToDelete(null);
      } catch (e) {
        setShowModelCannotBeRemoved(true);
        setTrialToDelete(null);
      }
    }, 500);
  }

  const confirmModelCannotBeRemoved = () => setShowModelCannotBeRemoved(false);

  const getExperiment = async () => {
    let experimentSubscription = api.getExperiment(experimentId).subscribe({
      next: exp => {
        setExperiment(exp);
      }
    })
  }

  const updateIndex = (newIndex) => {
    console.log("updateIndex");
    setCurrentIndex(newIndex);
  }

  const addInput = (input, skipRun = false) => {
    if (!skipRun) {
      let modelIds = getUniqueModelIds();
      modelIds.forEach(modelId => runTrial(modelId, input));
    }
  }
  const removeInput = input => {
    let newInputs = Array.from(inputs);
    let index = newInputs.findIndex(i => i === input);
    newInputs.splice(index, 1);
  }


  useEffect(() => {
    (async () => await getExperiment())();
  }, [])
  useEffect(() => {
    return () => {
      trialSubscriptions.forEach(s => s.unsubscribe());
    }
  }, []);
  useEffect(() => {
    if (experiment)
      getTrials(experiment);
  }, [experiment?.id])


  const selectedTrials = useMemo(() => getSelectedTrials(), [currentIndex, trials.length]);

  return {
    updateIndex,
    getExperiment,
    confirmModelCannotBeRemoved,
    confirmDeleteTrial,
    cancelDeleteTrial,
    showDeleteModal,
    makeExperiment,
    trialIsDeleting,
    showModelCannotBeRemoved,
    experiment: makeExperiment(),
    trials: selectedTrials,
    currentIndex,
    inputs,
    addInput,
    removeInput,
    addModel,
    currentPage,
    setCurrentPage
  }

}
