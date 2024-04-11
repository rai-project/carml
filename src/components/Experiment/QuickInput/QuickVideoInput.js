import React from "react";
import { useState, useEffect } from "react";
import "./QuickImageInput.scss";
import Task from "../../../helpers/Task";
import useQuickInputControl from "./useQuickInputControl";
import useBEMNaming from "../../../common/useBEMNaming";
import { QuickInputTabContent } from "./QuickInputTabContent";
import { QuickInputTabTitle } from "./QuickInputTabTitle";
import { QuickInputType } from "./quickInputType";
import ReactPlayer from 'react-player';

export default function QuickVideoInput(props) {
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
  const [selectedVideoSrc, setSelectedVideoSrc] = useState("");
  const task = Task.getStaticTask(props.model.output.type);
  const [URLValidity, setURLValidity] = useState(false);
  const tabs = getTabs(QuickInputType.Video);

  const videoInputProps = {
    updateSelectedVideoSrc: setSelectedVideoSrc,
    videoURL: selectedVideoSrc,
    setURLValidity: setURLValidity
  };

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
            videoInputProps={videoInputProps}
          />
        ))}
        {(!(selectedInputs.length === 0 || selectedInputs[0] === "") && URLValidity) && <ReactPlayer url={selectedVideoSrc} loop={true} controls={true} playing={true} style={{ margin: "20px auto" }} className="video-player" />}

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