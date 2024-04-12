import {useEffect, useMemo, useState} from "react";
import RunningStates from "../../../helpers/RunningStates";
import GetApiHelper from "../../../helpers/api";

export default function useQuickExperimentControl(model) {
  const [trial, setTrial] = useState(null);
  const [runningState, setRunningState] = useState(RunningStates.IDLE)
  const [trialSubscription, setTrialSubscription] = useState(undefined);
  const [experiment, setExperiment] = useState(undefined);

  const api = useMemo(() => GetApiHelper(), []);

  const getTrial = async (trialId) => {
    let observer = api.getTrial(trialId);

    observer.subscribe({
      next: trialOutput => {

        setTrial(trialOutput);
        if (trialIsComplete(trialOutput))
          setRunningState(RunningStates.COMPLETE);
      }
    })

    setTrialSubscription(observer);
  }

  const trialIsComplete = (trial) => trial?.results?.responses[0].features.length > 0;

  const runTrial = async (image) => {
    // Note: Does this need context added to it also (for Text Conversation) - 4/12/2024
    setRunningState(RunningStates.RUNNING);

    const response = await api.runTrial(model, image);

    api.getExperiment(response.experimentId).subscribe({
      next: exp => {
        getTrial(exp.trials[0].id);
        setExperiment(exp);
      }
    })
  }

  const resetTrial = () => {
    if (trialSubscription)
      trialSubscription.unsubscribe();
    setTrialSubscription(undefined);
    setRunningState(RunningStates.CANCELLED);
    setTrial(null);
  }

  useEffect(() => {
    resetTrial();
  }, [model.id])


  return {runTrial, trial, runningState, resetTrial};
}
