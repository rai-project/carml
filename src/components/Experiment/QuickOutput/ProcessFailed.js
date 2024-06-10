import React from "react";
import useBEMNaming from "../../../common/useBEMNaming";
import {ReactComponent as ErrorIcon} from "../../../resources/icons/process_failed.svg";
import "./ProcessFailed.scss"
import {useNavigate} from "react-router-dom";

export default function ProcessFailed(props) {
  const {getBlock, getElement} = useBEMNaming("process-failed");
  const History = useNavigate();
  return <div className={getBlock()}>
    <h3 className={getElement("heading")}>Output</h3>
    <p className={getElement("subtitle")}>What this model thinks the image is</p>
    <div className={getElement("box")}>
      <ErrorIcon/>
      <p className={getElement("box-heading")}>Process Failed</p>
      <a href={"#"} onClick={History?.back} className={getElement("box-link")}>Try another image</a>
    </div>

  </div>
}
