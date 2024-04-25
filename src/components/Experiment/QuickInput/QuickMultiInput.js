import React from "react";
import "./QuickImageInput.scss";
import Task from "../../../helpers/Task";
import useQuickInputControl from "./useQuickInputControl";
import useBEMNaming from "../../../common/useBEMNaming";
import { QuickMultiInputTabContent } from "./QuickMultiInputTabContent";
import { QuickInputTabTitle } from "./QuickInputTabTitle";
import {QuickInputType} from "./quickInputType";

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
  // Just printing out a list of the inputs, delete later
  // for (let i = 0; i < task.inputs.length; i++) {
  //   console.log(`input ${i}`, task.inputs[i]);
  // }

  const tabs = getTabs(QuickInputType.Image);
  // console.log('tabs', tabs)



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
        {tabs.map((tab, index) => (
          <div key={index}>
            {task.inputs.map((input, inputIndex) => (
              // Note: check what index does here
              <QuickMultiInputTabContent
                key={inputIndex}
                tab={tab}
                index={index}
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
            ))}
          </div>
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
