import useBEMNaming from "../../common/useBEMNaming";
import QuickInput from "../Experiment/QuickInput/QuickInput";
import QuickOutput from "../Experiment/QuickOutput/QuickOutput";
import React from "react";
import "./TaskCard.scss";


export function TaskCard(props) {
  const { getBlock } = useBEMNaming("example-task-card");

  const { defaultModel, runTrial, sampleInputs, trial, onBackClicked, onCompare } = props;

  const getContent = () => {
    if (!trial)
      return <QuickInput
        model={defaultModel}
        onRunModelClicked={runTrial}
        sampleInputs={sampleInputs}
        hideHeader
      />
    return <QuickOutput
      input={trial.inputs ? trial.inputs[0] : null}
      features={trial.completed_at ? trial.results.responses[0].features : null}
      onBackClicked={onBackClicked}
      compare={onCompare}
      trialOutput={trial}
      hideHeader
      showLearnMoreLink
      runTrial={runTrial}
    />
  }

  return <div className={ getBlock() }>

    { getContent() }
  </div>
}
