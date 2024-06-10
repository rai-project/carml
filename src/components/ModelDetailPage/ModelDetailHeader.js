import React from "react";
import Task from "../../helpers/Task";
import formatDate from "../../helpers/dateFormatter";
import ModelTag from "../Common/ModelTag";
import 'typeface-lato';
import useBEMNaming from "../../common/useBEMNaming";
import {ReactComponent as Arrow} from "../../resources/icons/arrow-right-white.svg";

export default function ModelDetailHeader(props) {
  const {getBlock, getElement} = useBEMNaming("model-detail-header");

  const jump = () => {
    const jumpRef = props.jumpRef;
    if (jumpRef && jumpRef.current)
      jumpRef.current.scrollIntoView({behavior: "smooth"});
  }

  const model = props.model;

  if (!!model) {
    const task = Task[model.output.type];

    let dateLabel = "Created:";
    let dateModified = "N/A";

    if (!!model.updated_at && model.updated_at !== "") {
      if (model.updated_at !== model.created_at) {
        dateLabel = "Modified:"
      }
      dateModified = formatDate(model.updated_at);
    }

    let machineTagKey = 0;
    let machineTags = <dd>N/A</dd>
    if (!!model.framework.architectures) {
      machineTags = model.framework.architectures.map(machine => <dd key={machineTagKey++}><ModelTag type="machine"
                                                                               content={machine.name}/></dd>);
    }

    return (
      <div className={getBlock()}>
        <div className={getElement("title-box")}>
          <dl>
            <div className={getElement("date-container")}>
              <dt className={getElement("date-label")}>{dateLabel}</dt>
              <dd className={getElement("date")}>{dateModified}</dd>
            </div>
          </dl>
          <p className={getElement("model-name")}>{model.name} </p>
          <p className={getElement("model-description")}>{model.short_description}</p>
          <button className={getElement("jump-link")} onClick={jump}>
            Learn more about this model <Arrow
            className={getElement("jump-link-icon")}/></button>

        </div>
        <dl className={getElement("data-box")}>
          <div className={getElement("task-box model-detail-header__task-box-first")}>
            <dt className={getElement("label")}>Task:</dt>
            <dd>
              <ModelTag type="task" content={task.name}/>
            </dd>
            <dd className={getElement("task-description")}>{task.description}</dd>

          </div>
          <div className={getElement("framework-box")}>
            <dt className={getElement("label")}>Framework:</dt>
            <dd>
              <ModelTag type="framework" content={model.framework.name}/>
            </dd>
          </div>
          <div className={getElement("machines-box")}>
            <dt className={getElement("label")}>Machines:</dt>
            <div className={getElement("machine-tags-box")}>
              {machineTags}
            </div>
          </div>
          <div className={getElement("training-set-box")}>
            <dt className={getElement("label")}>Trained on:</dt>
            <dd>
              <ModelTag type="training-set" content={model.attributes.training_dataset}/>
            </dd>
          </div>
        </dl>
      </div>
    );
  } else {
    return (
      <p>Loading...</p>
    )
  }

}
