import React from "react";
import ClassificationSummary from "./Summaries/ClassificationSummary";
import ModelTag from "../Common/ModelTag";
import ObjectDetectionSummary from "./Summaries/ObjectDetectionSummary";
import { ReactComponent as CloseIcon } from "../../resources/icons/close-icon.svg";
import {
  image_classification,
  image_enhancement,
  instance_segmentation,
  object_detection,
  semantic_segmentation,
  textToText,
  textToCode,
} from "../../helpers/TaskIDs";
import ImageEnhancementSummary from "./Summaries/ImageEnhancementSummary";
import SemanticSegmentationSummary from "./Summaries/SemanticSegmentationSummary";
import { ExperimentDetailModalTypes } from "../../routes/ExperimentDetailContainer";
import TrialFailed from "./TrialFailed";
import TextSummary from "./Summaries/TextSummary";
import TextToCodeSummary from "./Summaries/TextToCodeSummary";

export default function TrialOutputWrapper(props) {
  const handleClose = () => {
    props.onDeleteTrial(
      props.trial,
      ExperimentDetailModalTypes.confirmDeleteModel
    );
  };

  let model = props.trial.model;

  const getContent = () => {
    const hasNoInputs =
      props.trial.inputs.length === 0 || props.trial.inputs[0]["src"] === "";

    if (props.processFailed) {
      return <TrialFailed />;
    }

    if (props.trial.completed_at) {
      switch (props.trial.model.output.type) {
        case image_classification:
          return (
            <ClassificationSummary
              value={props.value}
              results={props.trial.results}
            />
          );
        case object_detection:
          return (
            <ObjectDetectionSummary value={props.value} trial={props.trial} />
          );
        case image_enhancement:
          return (
            <ImageEnhancementSummary value={props.value} trial={props.trial} />
          );
        case semantic_segmentation:
        case instance_segmentation:
          return (
            <SemanticSegmentationSummary
              value={props.value}
              trial={props.trial}
            />
          );
        case textToText:
          return <TextSummary trial={props.trial} value={props.value} />;
        case textToCode:
          return <TextToCodeSummary trial={props.trial} value={props.value} />;
        default:
          return <div>Something went wrong</div>
      }

      return <></>;
    } else if (hasNoInputs) {
      return (
        <div className={"trial-output-wrapper__no-input"}>
          <p className={"trial-output-wrapper__no-input-text"}>
            Add an input to see predictions
          </p>
        </div>
      );
    } else {
      return (
        <div className="trial-output-wrapper__loading">
          <p className="trial-output-wrapper__loading-header">Output:</p>
          <div className="trial-output-wrapper__spinner-container">
            <div className="trial-output-wrapper__spinner"></div>
            <p className="trial-output-wrapper__spinner-text">
              This could take a few minutes...
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`trial-output-wrapper ${
        props.trialIsDeleting &&
        props.deletedTrial?.id === props.trial.id &&
        "trial-output-wrapper__closing"
      }`}
    >
      <div className="trial-output-wrapper__title-box">
        <dl className="trial-output-wrapper__title-definition-list">
          <dt className="trial-output-wrapper__model-label">Model:</dt>
          <dd>
            <a
              className="trial-output-wrapper__model-name"
              target={"_blank"}
              href={"/model/" + model?.id}
            >
              {model?.name}
            </a>
          </dd>
        </dl>
        <button
          className="trial-output-wrapper__delete-trial-button-wrapper"
          onClick={() => handleClose()}
        >
          <CloseIcon className="trial-output-wrapper__delete-trial-button" />
        </button>
      </div>
      <div className="trial-output-wrapper__content-box">
        <div className="trial-output-wrapper__info-row">
          <dl className="trial-output-wrapper__model-details">
            <div className={"trial-output-wrapper__model-details-section"}>
              <dt className="trial-output-wrapper__detail-label">Framework:</dt>
              <dd className="trial-output-wrapper__model-tag">
                <ModelTag type="framework" content={model?.framework.name} />
              </dd>
            </div>
          </dl>
          <div className="trial-output-wrapper__link-box">
            {/*<a className="trial-output-wrapper__link" href="">Advanced Output Analysis</a>*/}
            {/*<ExternalLink /> Hidden for now */}
          </div>
        </div>
        {getContent()}
      </div>
    </div>
  );
}
