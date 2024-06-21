import React from "react";
import "./QuickImageInput.scss";
import Task from "../../../helpers/Task";
import useQuickInputControl from "./useQuickInputControl";
import useBEMNaming from "../../../common/useBEMNaming";
import { QuickMultiInputTabContent } from "./QuickMultiInputTabContent";
import { QuickInputTabTitle } from "./QuickInputTabTitle";
import { QuickInputType } from "./quickInputType";

export default function QuickMultiInput(props) {
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
  const { getBlock, getElement } = useBEMNaming("quick-image-input");

  const task = Task.getStaticTask(props.model.output.type);
  // Note: This feels pretty hacky and TaskInputType/QuickInputType should probably be refactored?
  const tabs = getTabs(task.inputType.toLowerCase());

  return (
    <div className={getBlock()}>
      {!props.hideHeader && (
        <>
          <h2 className={getElement("title")}>Try this model</h2>
          <div className={getElement("subtitle")}>{task.description}</div>
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
        {tabs.map((tab, tabIndex) => (
          <div key={tabIndex}>
            {task.inputs.map((input, inputIndex) => {
              const noURLInput = input?.inputUrl === false;
              const noUploadInput = input?.inputUpload === false;
              let thisTab = tab;
              if ((tab.id === "url-input" && noURLInput) || (tab.id === "upload-input" && noUploadInput))
                thisTab = input.defaultTab;               
              return (
                <QuickMultiInputTabContent
                  key={inputIndex}
                  tab={thisTab}
                  tabIndex={tabIndex}
                  getElement={getElement}
                  {...props}
                  removeInput={removeInput}
                  addInput={addInput}
                  selectInput={selectInput}
                  tabIsSelected={tabIsSelected}
                  selectedInputs={selectedInputs}
                  input={input}
                  inputIndex={inputIndex}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button
        className={getElement("run-model")}
        disabled={selectedInputs.length < task.inputs.length || selectedInputs[0] === ""}
        onClick={() => runModel()}
      >
        Run model and see results
      </button>
    </div>
  );
}
