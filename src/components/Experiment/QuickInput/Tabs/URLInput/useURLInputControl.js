import ImageVerifier from "../../../../../helpers/imageVerifier";
import Task from "../../../../../helpers/Task";
import { useState } from "react";
import VideoVerifier from "../../../../../helpers/videoVerifier";
import { QuickInputType } from "../../quickInputType";
import { TaskInputTypes } from "../../../../../helpers/TaskInputTypes";

const UrlMatcher = /https?:\/\/.+/;

export default function useURLInputControl(props) {
  const [isInvalidUrl, setIsInvalidUrl] = useState([false]);

  const urlChanged = async (event, index) => {
    if (event.persist)
      event.persist();
    let url = event.target.value;
    let tempUrl = event.target.value;
    if (tempUrl.match(UrlMatcher) === null)
      tempUrl = "";
    else {
      if (task.inputType === QuickInputType.Image) {
        let verifier = new ImageVerifier(tempUrl);
        if (!(await verifier.Verify()))
          tempUrl = "";
      }
      else if (task.inputType === TaskInputTypes.Video) {
        let verifier = new VideoVerifier(tempUrl);
        if (!(await verifier.Verify()))
          tempUrl = "";
      }
    }
    let currentInvalidUrl = isInvalidUrl;
    currentInvalidUrl[index] = tempUrl === "" && url !== "";
    setIsInvalidUrl(currentInvalidUrl);

    if (typeof (props.inputSelected) === 'function') {
      props.inputSelected(url, index);

    }
  };

  const getUrlValidity = (index) => isInvalidUrl[index];




  const task = Task.getStaticTask(props.task);


  let values = props.values;
  if (!values || values.length === 0) values = [""];

  return { getUrlValidity, task, urlChanged, values };
}


export const validateURL = async (URL, taskInputType) => {
  if (URL.match(UrlMatcher) === null)
    return false;
  if (taskInputType === QuickInputType.Image) {

    let verifier = new ImageVerifier(URL);
    if (!(await verifier.Verify()))
      return false;
  }
  else if (taskInputType === TaskInputTypes.Video) {
    console.log("Yaha aya");
    let verifier = new VideoVerifier(URL);
    console.log("Veriifer", await verifier.Verify());
    if (!(await verifier.Verify()))
      return false;
  }
  return true;
};