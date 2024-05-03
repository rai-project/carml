import {useState} from "react";
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
  const [selectedTab, setSelectedTab] = useState(0);

  const getTabs = (type = QuickInputType.Image) => {  // TODO: Remove this default
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
  const getInputTabType = (type) => {
    switch (type) {
      case QuickInputType.Image:
        return [{id: 'url-input', title: 'URL', component: URLInputsTab}];
      case QuickInputType.Audio:
        return [
          {id: 'url-input', title: 'URL', component: URLInputsTab},
          {id: 'audio-input', title: 'Record', component: AudioInputTab}
        ];
      case QuickInputType.Text:
        return [{id: 'text-input', title: 'Text', component: TextInputTab}];
      default:
        // TODO: Create a default "error" tab
        return '--error--';
    }
  }
  const getUploadTabType = (type) => {
    switch (type) {
      case QuickInputType.Image:
      case QuickInputType.Audio:
        return {id: 'upload-input', title: 'Upload', component: UploadInputsTab};
      case QuickInputType.Text:
        return {id: 'upload-input', title: 'Upload', component: UploadTextInputTab};
      default:
        // TODO: Create a default "error" tab
        return '--error--';
    }
  }  
  const runModel = () => {
    // console.log('runModel selectedInputs', selectedInputs)
    if (typeof (props.onRunModelClicked) === 'function')
      props.onRunModelClicked(selectedInputs.filter(url => url));
  }
  const selectInput = (url, index) => {
    let selected = selectedInputs;

    if (index)
      selected[index] = url;
    else
      selected = Array.isArray(url) ? url : [url];
    setSelectedInputs(selected);
  }
  const selectMultiInput = (url, index) => {
    // console.log('useQuickInputControl url', url)
    console.log('useQuickInputControl multiInput index', index)  // Why is this always the same? Is it always the same for selectInput also?
    let selected = selectedInputs;

    // console.log('selected', selected)

    if (index)
      selected[index] = url;
    else
      selected = Array.isArray(url) ? url : [url];
    setSelectedInputs(selected);    
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
