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
  imageTo3D,
  audioToText,
  textToAudio,
  textConversation,
  textGuidedImageToImage,
  visualQuestionAnswering,
  documentQuestionAnswering,
  textToVideo,
  textTo3D,
  textClassification,
  imageToText,
  audioClassification,
  textToImage,
  audioToAudio,
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
import TextGuidedImageToImageOutput from "./Outputs/TextGuidedImageToImage/TextGuidedImageToImageOutput";
import VisualQuestionAnsweringOutput from "./Outputs/VisualQuestionAnswering/VisualQuestionAnsweringOutput";
import DocumentQuestionAnsweringOutput from "./Outputs/DocumentQuestionAnswering/DocumentQuestionAnsweringOutput";
import TextToVideoOutput from "./Outputs/TextToVideo/TextToVideoOutput";
import TextToImageOutput from "./Outputs/TextToImage/TextToImageOutput";
import TextClassificationOutput from "./Outputs/TextClassification/TextClassificationOutput";
import ImageToTextOutput from "./Outputs/ImageToText/ImageToTextOutput";
import ImageTo3DOutput from "./Outputs/ImageTo3D/ImageTo3DOutput";
import TextTo3DOutput from "./Outputs/TextTo3D/TextTo3DOutput";
import AudioToTextOutput from "./Outputs/AudioToText/AudioToTextOutput";
import TextToAudioOutput from "./Outputs/TextToAudio/TextToAudioOutput";
import AudioClassificationOutput from "./Outputs/AudioClassification/AudioClassificationOutput";
import AudioToAudioOutput from "./Outputs/AudioToAudio/AudioToAudioOutput";

const defaultProps = {
  className: "quick-output",
  features: [],
  input: "",
  compare: () => { },
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
        case styleTransfer:
          return (
            <StyleTransferOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case imageTo3D:
          return (
            <ImageTo3DOutput
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
        case audioToText:
          return (
            <AudioToTextOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textConversation:
          return (
            <TextConversationOutput
              trial={props.trialOutput}
              onSubmit={props.runTrial}
            />
          );
        case textGuidedImageToImage:
          return (
            <TextGuidedImageToImageOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case visualQuestionAnswering:
          return (
            <VisualQuestionAnsweringOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case documentQuestionAnswering:
          return (
            <DocumentQuestionAnsweringOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textToImage:
          return (
            <TextToImageOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textToVideo:
          return (
            <TextToVideoOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textToImage:
          return (
            <TextToAudioOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case textTo3D:
          return (
            <TextTo3DOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case imageToText:
          return (
            <ImageToTextOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );

        case textClassification:
          return (
            <TextClassificationOutput
              onBackClicked={props.onBackClicked}
              trial={props.trialOutput}
            />
          );
        case audioClassification:
          return (
            <>
              <InputPreview input={props.trialOutput.inputs[0].src} inputType="audio" onBackClicked={props.onBackClicked} />
              <AudioClassificationOutput
                features={props.features}
                trial={props.trialOutput}
              />
            </>
          );
        case audioToAudio:
          return (
            <AudioToAudioOutput
              features={props.features}
              trial={props.trialOutput}
            />
          );
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
        {/* <button className={element('share-button')}>Share with community</button> Hidden for now */}
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
