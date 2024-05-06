import ImageVerifier from "../../../../../helpers/imageVerifier";
import Task from "../../../../../helpers/Task";
import {useState} from "react";

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
      let verifier = new ImageVerifier(tempUrl);
      if (!(await verifier.Verify()))
        tempUrl = "";
    }
    let currentInvalidUrl = isInvalidUrl;
    currentInvalidUrl[index] = tempUrl === "" && url !== "";
    setIsInvalidUrl(currentInvalidUrl);

    if (typeof (props.inputSelected) === 'function') {
      console.log('about to set inputSelected..')
      console.log('isInvalidUrl', isInvalidUrl)
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
  }

  const getUrlValidity = (index) => isInvalidUrl[index];

  const task = Task.getStaticTask(props.task);


  let values = props.values;
  if (!values || values.length === 0) values = [""];

  return {getUrlValidity, task, urlChanged, values}
}
