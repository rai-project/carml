import React, {useMemo, useState} from "react";
import ModelListContainer from "./ModelListContainer";
import GetApiHelper from "../helpers/api";
import {useHistory} from "react-router-dom";
import Task from "../helpers/Task";
import ExperimentDetailContainer from "./ExperimentDetailContainer";
import {getTaskFromQueryString} from "../helpers/QueryParsers";

const modelListPage = "MODEL_LIST";
const experimentPage = "EXPERIMENT";

export default function NewExperimentContainer(props) {
  const [currentPage, setCurrentPage] = useState(modelListPage);
  const [models, setModels] = useState([]);

  const api = useMemo(() => GetApiHelper(), []);
  const History = useHistory();
  const task = getTaskFromQueryString(window.location.search);

  const {id: taskId} = Task.getStaticTask(task);
  const selectModels = (selectedModels) => {
    setCurrentPage(experimentPage);
    setModels(selectedModels);
  }

  const runModel = (model, inputs, experimentId, context=null) => {
    // Note: Adding context param for Conversation task; unsure if needed here
    // Check and confirm later - Alex, 4/10/2024
    return inputs.map(input => api.runTrial(model, input, experimentId, context));
  }

  const fabricateModel = (model) => ({
    model: model,
    inputs: [""]
  })

  const fabricateExperiment = () => ({
    id: "i'm not real",
    trials: models.map(fabricateModel)
  })

  const runModels = async (inputs) => {
    const [first, ...rest] = models;

    const firstResult = await api.runTrial(first, inputs[0]);
    const experimentId = firstResult.experimentId;

    let trialPromises = [runModel(first, inputs.slice(1), experimentId)];

    trialPromises.push(...rest.map((model) => {
      return runModel(model, inputs, experimentId);
    }));

    let flattenedPromises = trialPromises.flat();

    Promise.all(flattenedPromises).then(final => {
      if (History)
        History.push(`/experiment/${experimentId}`);
    })
  }


  if (currentPage === experimentPage)
    return <ExperimentDetailContainer
      addInput={runModels}
      experiment={fabricateExperiment()}
    />

  return <ModelListContainer
    add runModels={selectModels} selectedModels={[]}
    hideTaskFilters
    task={taskId}
  />
}
