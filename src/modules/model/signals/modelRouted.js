import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";

import getModelGraph from "../actions/getModelGraph";
import populateModelData from "../actions/populateModelData";
import modelInformationChain from "../../common/chains/modelInformationChain";

export default [
  set(state`app.currentPage`, "ModelInformation"),
  ...modelInformationChain,
  set(state`models.currentModel`, props`name`),
  populateModelData,
  getModelGraph,
  {
    onMessage: [set(state`model.graph`, props`model`)],
    onEnd: [
      when(props`code`),
      {
        true: [
          set(state`app.isError`, true),
          set(state`app.errorMessage`, props`message`)
        ]
      }
    ]
  }
];