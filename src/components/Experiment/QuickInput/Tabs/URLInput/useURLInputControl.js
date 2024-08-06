import ImageVerifier from "../../../../../helpers/imageVerifier";
import VideoVerifier from "../../../../../helpers/videoVerifier";
import AudioVerifier from "../../../../../helpers/audioVerifier";
import Task from "../../../../../helpers/Task";
import { useState } from "react";
import { TaskInputTypes } from "../../../../../helpers/TaskInputTypes";

const UrlMatcher = /https?:\/\/.+/;

export default function useURLInputControl(props) {
  const task = Task.getStaticTask(props.task);

  const [isInvalidUrl, setIsInvalidUrl] = useState([false]);
    
  const urlChanged = async (event, index) => {
    if (event.persist)
      event.persist();
    const inputType = task.useMultiInput ? task.inputs[index].inputType : task.inputType;
    let url = event.target.value;
    let tempUrl = event.target.value;
    if (tempUrl.match(UrlMatcher) === null)
      tempUrl = "";
    else {
      let verifier;
      switch (inputType) {
        case TaskInputTypes.Image:
        case TaskInputTypes.ImageCanvas:
          verifier = new ImageVerifier(tempUrl);
          break;
        case TaskInputTypes.Audio:
          verifier = new AudioVerifier(tempUrl);
          break;
        case TaskInputTypes.Video:
          verifier = new VideoVerifier(tempUrl);
          break;
        default:
          break;
      }
      if (verifier && !(await verifier.Verify()))
        tempUrl = "";
    }
    let currentInvalidUrl = isInvalidUrl;
    currentInvalidUrl[index] = tempUrl === "" && url !== "";
    setIsInvalidUrl(currentInvalidUrl);

    if (typeof (props.inputSelected) === 'function') {
      // console.log('about to set inputSelected..')
      // console.log('isInvalidUrl', isInvalidUrl)
      // if (isInvalidUrl[index]) {
      //   console.log('this url is invalid....')
      //   console.log(isInvalidUrl[index])
      // } else {
      //   console.log('this url is valid....')
      //   console.log(isInvalidUrl[index])
      //   props.inputSelected(url, index);
      // }


      // Todo: How to not add this to inputSelected if invalid url?
      props.inputSelected(url, index);
    }
  };

  const getUrlValidity = (index) => isInvalidUrl[index];

  let values = props.values;
  if (!values || values.length === 0) values = [""];

  return { getUrlValidity, task, urlChanged, values };
}
