import React from "react";
import useBEMNaming from "../../../common/useBEMNaming";
import Task from "../../../helpers/Task";
import "./QuickTextInput.scss";
import {QuickInputTabTitle} from "./QuickInputTabTitle";
import {QuickInputTabContent} from "./QuickInputTabContent";
import useQuickInputControl from "./useQuickInputControl";
import {QuickInputType} from "./quickInputType";

export default function QuickTextInput(props) {
    const {
        tabIsSelected,
        selectedInputs,
        addInput,
        getTabs,
        removeInput,
        selectTab,
        selectInput,
        runModel,
        hideUpload=false,
    } = useQuickInputControl(props);
    const {getBlock, getElement} = useBEMNaming("quick-text-input");
    const task = Task.getStaticTask(props.model.output.type);
    const tabs = getTabs(QuickInputType.Text);

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
                disabled={selectedInputs.length === 0 || selectedInputs[0] === ""}
                onClick={() => runModel()}
                className={getElement("submit-button")}
            >
                Run model and see results
            </button>
        </div>
    );
}
