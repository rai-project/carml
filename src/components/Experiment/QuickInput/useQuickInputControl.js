import {useEffect, useState} from "react";
import SampleInputsTab from "./Tabs/SampleInput/SampleInputsTab";
import UploadInputsTab from "./Tabs/UploadInput/UploadInputsTab";
import AudioInputTab from "./Tabs/AudioInput/AudioInputTab";
import URLInputsTab from "./Tabs/URLInput/URLInputsTab";
import clone from "../../../helpers/cloner";
import {QuickInputType} from "./quickInputType";
import TextInputTab from "./Tabs/TextInput/TextInputTab";
import UploadTextInputTab from "./Tabs/UploadTextInput/UploadTextInputTab";
import Task from "../../../helpers/Task";

export default function useQuickInputControl(props) {
  const task = Task.getStaticTask(props.model.output.type);
  const [selectedInputs, setSelectedInputs] = useState([""]);
  const [selectedInputData, setSelectedInputData] = useState([{src: "", inputType: ""}]);
  const [selectedTab, setSelectedTab] = useState(0);

  // Note: Uncomment for debugging
  // useEffect(() => {
  //   Because of how hooks/timing works with react, if you print these 
  //   variables out below, such as in `selectInput`, you may see incorrect values
  //   console.log('selectedInputs', selectedInputs)
  //   console.log('selectedInputData', selectedInputData)
  // }, [selectedInputs, selectedInputData]);

  const getTabs = (type = QuickInputType.Image) => {  // TODO: Remove this default
    if(task.useMultiInput) return getMultiInputTabs(task.inputs);
    const sample = {
      id: 'sample-input',
      title: 'Sample inputs',
      component: SampleInputsTab,
      props: {sampleInputs: props.sampleInputs, type: type}
    }
    const upload = getUploadTabType(type);
    const input = getInputTabType(type);
    const tabs = [];

    if (!props.hideSample) tabs.push(sample);
    if (!props.hideUpload) tabs.push(upload);  // Currently only hideUpload is being used
    if (!props.hideUrl) tabs.push(...input);

    return tabs;
  }

  const getMultiInputTabs = (types) => {
    const sample = {
      id: 'sample-input',
      title: 'Sample inputs',
      component: SampleInputsTab,
      props: { sampleInputs: props.sampleInputs, type: types }
    };
    const upload = [];
    const input = [];
    const tabs = [];
    types.forEach(type => {
      if (!(type?.inputUpload === false)) upload.push(getUploadTabType(type.inputType.toLowerCase()));
      if (!(type?.inputUrl === false)) input.push(...getInputTabType(type.inputType.toLowerCase()));
    });

    if (!props.hideSample) tabs.push(sample);
    if (!props.hideUpload) tabs.push(...upload);
    if (!props.hideUrl) tabs.push(...input);
    return tabs;
  }


  const getInputTabType = (type) => {
    switch (type) {
      case QuickInputType.Image:
      case QuickInputType.Document:
        return [{id: 'url-input', title: 'URL', component: URLInputsTab}];
      case QuickInputType.Audio:
        return [
          {id: 'url-input', title: 'URL', component: URLInputsTab},
          {id: 'audio-input', title: 'Record', component: AudioInputTab}
        ];
      case QuickInputType.Text:
          return [{ id: 'text-input', title: 'Text', component: TextInputTab }];
      default:
        // TODO: Create a default "error" tab
        return '--error--';
    }
  }
  const getUploadTabType = (type) => {
    switch (type) {
      case QuickInputType.Image:
      case QuickInputType.Audio:
      case QuickInputType.Document:
        return {id: 'upload-input', title: 'Upload', component: UploadInputsTab};
      case QuickInputType.Text:
        return {id: 'upload-input', title: 'Upload', component: UploadTextInputTab};
      default:
        // TODO: Create a default "error" tab
        return '--error--';
    }
  }  
  const runModel = () => {
    if (typeof (props.onRunModelClicked) === 'function') {
      props.onRunModelClicked(selectedInputData.filter(input => input));
    } 
  }
  const selectInput = (url, index) => {
    let selected = selectedInputs;
    let selectedData = selectedInputs;

    if (index) {
      // Note: This doesn't get selected in audioToText Sample inputs 
      // - does it ever happen? Or do we always go to the else?
      
      // Display as selected
      selected[index] = url;
      // Data to be sent to API
      if (typeof url !== 'object') {
        selectedData[index] = { src: url, inputType: task.inputType }
      } else {
        selectedData[index] = { inputType: task.inputType, ...url }
      }
    } else {
      // Display as selected
      selected = Array.isArray(url) ? url : [url];
      // Data to be sent to API
      if (typeof url !== 'object') {
        selectedData = [{ src: url, inputType: task.inputType }];
      } else {
        selectedData = [{ inputType: task.inputType, ...url }];
      }
    }

    setSelectedInputs(selected);
    setSelectedInputData(selectedData);
  }
  const selectMultiInput = (url, inputIndex) => {
    let selected = [...selectedInputs];
    let selectedData = [...selectedInputData];

    if (inputIndex >= 0) {
      // Display as selected
      selected[inputIndex] = url;
      // Data to be sent to API
      if (typeof url !== 'object') {
        selectedData[inputIndex] = {
          src: url, 
          inputType: task.inputs[inputIndex].inputType
        }        
      } else {
        selectedData[inputIndex] = {
          inputType: task.inputs[inputIndex].inputType,
          ...url
        }
      }
    }
    else {
      // Display as selected
      selected = Array.isArray(url) ? url : [url];
      // Data to be sent to API
      if (typeof url !== 'object') {
        selectedData[inputIndex] = [{
          src: url, 
          inputType: task.inputs[inputIndex].inputType
        }]     
      } else {
        selectedData[inputIndex] = [{
          inputType: task.inputs[inputIndex].inputType,
          ...url
        }]
      }
    }
      
    // Note: You need to uncomment the useEffect above to accurately see what selectedInputs/Data is
    setSelectedInputs(selected);   
    setSelectedInputData(selectedData);
  }

  const addInput = (url = "") => {
    let state = clone(selectedInputs);
    if (typeof url !== "string") url = "";

    state.push(url);
    setSelectedInputs(state);
  }
  const removeInput = (url) => {
    let selected = Array.from(selectedInputs);
    selected = selected.filter(u => u !== url);
    setSelectedInputs(selected);
  }
  const selectTab = (index) => {
    setSelectedInputs([""]);
    setSelectedTab(index);
  }
  const tabIsSelected = (index) => selectedTab === index;


  return {
    selectedInputs, 
    getTabs, 
    runModel, 
    selectInput: !task.useMultiInput ? selectInput : selectMultiInput, 
    addInput, 
    removeInput, 
    selectTab, 
    tabIsSelected
  };
}
