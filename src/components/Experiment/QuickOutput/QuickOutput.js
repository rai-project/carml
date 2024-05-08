import React from "react";
import InputPreview from "./InputPreview";
import ClassificationOutput from "./Outputs/Classification/ClassificationOutput";
import PendingOutput from "./Outputs/Classification/PendingOutput";
import {
  image_classification,
  image_enhancement,
  instance_segmentation,
  object_detection,
  semantic_segmentation,
  textToText,
  textToCode,
  styleTransfer,
  audioToText,
  textToAudio,
  textConversation
} from "../../../helpers/TaskIDs";
import ObjectDetection from "./Outputs/ObjectDetection/ObjectDetection";
import ImageEnhancement from "./Outputs/ImageEnhancement/ImageEnhancement";
import SemanticSegmentation from "./Outputs/SemanticSegmentation/SemanticSegmentation";
import ProcessFailed from "./ProcessFailed";
import "./QuickOutput.scss";
import useBEMNaming from "../../../common/useBEMNaming";
import TextOutput from "./Outputs/Text/TextOutput";
// import { TextToCode } from "../../ModelDetailPage/ModelDetailPage.stories"; Unused
import TextToCodeOutput from "./Outputs/TextToCode/TextToCodeOutput";
import TextConversationOutput from "./Outputs/TextConversation/TextConversationOutput";
import StyleTransferOutput from "./Outputs/StyleTransfer/StyleTransferOutput";

const defaultProps = {
  className: "quick-output",
  features: [],
  input: "",
  compare: () => {},
  processFailed: false,
  inputType: "image", // Todo: Change this default?
};

export default function QuickOutput(givenProps) {
  const props = { ...defaultProps, ...givenProps };
  const { getElement, getBlock } = useBEMNaming(props.className);

  const preview = (
    <InputPreview
      input={props.input}
      onBackClicked={props.onBackClicked}
      inputType={props.inputType}
    />
  );

  const makeOutput = () => {
    if (props.processFailed) {
      return (
        <>
          {preview}
          <ProcessFailed />
        </>
      );
    } else if (props.features || props.trialOutput.completed_at) {
      switch (props.trialOutput.model.output.type) {
        case image_classification:
          return (
            <>
              {preview}
              <ClassificationOutput
                features={props.features}
                trial={props.trialOutput}
              />
            </>
          );
        case image_enhancement:
          return (
            <>
              <ImageEnhancement
                trial={props.trialOutput}
                onBackClicked={props.onBackClicked}
                feature={props.trialOutput.results.responses[0].features[0]}
              />
            </>
          );
        case object_detection:
          return (
            <ObjectDetection
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case semantic_segmentation:
        case instance_segmentation:
          return (
            <SemanticSegmentation
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textToText:
          return (
            <TextOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textToCode:
          return (
            <TextToCodeOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );

        // TODO: Need to add audioToText etc


        case textConversation:
          return (
            <TextConversationOutput 
              trial={props.trialOutput}
              onSubmit={props.runTrial}
            />
          )
        case styleTransfer:
          return (
            <StyleTransferOutput 
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          )
        default:
          return (
            <>
              {preview}
              <PendingOutput unsupportedModel />
            </>
          );
      }
    } else {
      return (
        <>
          {preview}
          <PendingOutput />
        </>
      );
    }
  };

  return (
    <div className={getBlock()}>
      <div className={getElement("header")}>
        {!props.hideHeader && (
          <h2 className={getElement("title")}>Try This Model</h2>
        )}
        {/*<button className={element('share-button')}>Share with community</button> Hidden for now*/}
      </div>
      <div className={getElement("content")}>{makeOutput()}</div>
      <div className={getElement("footer")}>
        {props.showLearnMoreLink && (
          <a
            href={`/model/${props.trialOutput?.model?.id}`}
            className={getElement("compare-button")}
            onClick={props.compare}
          >
            Learn more about this model
          </a>
        )}
        {!props.showLearnMoreLink && (
          <button
            className={getElement("compare-button")}
            onClick={props.compare}
          >
            Compare with other models
          </button>
        )}
      </div>
    </div>
  );
}
