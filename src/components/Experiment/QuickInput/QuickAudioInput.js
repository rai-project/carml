import React from "react";
import "./QuickAudioInput.scss";
import Task from "../../../helpers/Task";
import useQuickInputControl from "./useQuickInputControl";
import useBEMNaming from "../../../common/useBEMNaming";
import { QuickInputTabContent } from "./QuickInputTabContent";
import { QuickInputTabTitle } from "./QuickInputTabTitle";
import {QuickInputType} from "./quickInputType";

export default function QuickAudioInput(props) {
    console.log('QuickAudioInput: ', props);
  const {
    tabIsSelected,
    selectedInputs,
    addInput,
    getTabs,
    removeInput,
    selectTab,
    selectInput,
    runModel,
  } = useQuickInputControl(props);
  const { getBlock, getElement } = useBEMNaming("quick-audio-input");

  const task = Task.getStaticTask(props.model.output.type);
  console.log('QuickAudioInput task: ', task);
  const tabs = getTabs(QuickInputType.Audio);
  return (
    <div className={getBlock()}>
      {!props.hideHeader && (
        <>
          <h2 className={getElement("title")}>Try this model</h2>
          <div className={getElement("subtitle")}>{task.inputText}</div>
        </>
      )}
      <div className={getElement("tabs")}>
        <div className={getElement("tab-titles")} role="tablist">
          {tabs.map((tab, index) => (
            <QuickInputTabTitle
              key={index}
              tab={tab}
              index={index}
              tabIsSelected={tabIsSelected}
              selectTab={selectTab}
              getElement={getElement}
            />
          ))}
        </div>
        {tabs.map((tab, index) => (
          <QuickInputTabContent
            key={index}
            tab={tab}
            index={index}
            getElement={getElement}
            {...props}
            removeInput={removeInput}
            addInput={addInput}
            selectInput={selectInput}
            tabIsSelected={tabIsSelected}
            selectedInputs={selectedInputs}
          />
        ))}
      </div>
      <button
        className={getElement("run-model")}
        disabled={selectedInputs.length === 0 || selectedInputs[0] === ""}
        onClick={() => runModel()}
      >
        Run model and see results
      </button>
    </div>
  );
}
