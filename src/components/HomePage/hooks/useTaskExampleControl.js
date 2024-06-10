import useTaskSelection from "./useTaskSelection";
import useQuickExperimentControl from "./useQuickExperimentControl";
import {useNavigate} from "react-router-dom";
import useOutputGenerator from "./useOutputGenerator";


export default function useTaskExampleControl() {
  const taskSelection = useTaskSelection();
  const quickExperiment = useQuickExperimentControl(taskSelection.selectedTask.defaultModel);
  const trialOutput = useOutputGenerator(taskSelection.selectedTask.id);
  const history = useNavigate();


  const onBackClick = () => quickExperiment.resetTrial();
  const onCompare = () => {
    if (history) history(`/experiment/${quickExperiment.trial.id}`)
  }

  const navigation = {onBackClick, onCompare};


  return {taskSelection, quickExperiment, navigation, trialOutput};
}
