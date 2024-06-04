import React, { useRef } from "react";
import ModelDetailHeader from "./ModelDetailHeader";
import QuickInput from "../Experiment/QuickInput/QuickInput";
import QuickOutput from "../Experiment/QuickOutput/QuickOutput";
import Header from "../Header/Header";
import ModelDescription from "./ModelDescription";
import {
  image_classification,
  image_enhancement,
  instance_segmentation,
  object_detection,
  semantic_segmentation,
  styleTransfer,
  styleTransfer,
  textToText,
  textToCode,
  audioToText,
  textConversation,
  visualQuestionAnswering,
  textGuidedImagetoImage,
  documentQuestionAnswering,
} from "../../helpers/TaskIDs";
import {
  SampleImageClassificationInputs,
  SampleImageEnhancementInputs,
  SampleObjectDetectionInputs,
  SampleSegmentationInputs,
  SampleTextInputs,
  SampleTextToCodeInputs,
  SampleAudioToTextInputs,
  SampleTextConversationInputs,
  SampleStyleTransferInputs,
  SampleVisualQuestionAnsweringInputs,
  SampleTextGuidedImagetoImageInputs,
  SampleDocumentQuestionAnsweringInputs
} from "../../helpers/sampleImages";  // This file should be renamed

const ModelDetailPage = (props) => {
  const jumpRef = useRef();

  const outputType = props.model?.output?.type || "";

  const getSampleInputs = () => {
    switch (outputType) {
      case object_detection:
        return SampleObjectDetectionInputs;
      case image_enhancement:
        return SampleImageEnhancementInputs;
      case semantic_segmentation:
      case instance_segmentation:
        return SampleSegmentationInputs;
      case styleTransfer:
        return SampleStyleTransferInputs;
      case styleTransfer:
        return SampleStyleTransferInputs;
      case textToText:
        return SampleTextInputs;
      case textToCode:
        return SampleTextToCodeInputs;
      case audioToText:
        return SampleAudioToTextInputs;
      case textConversation:
        return SampleTextConversationInputs;
      case visualQuestionAnswering:
        return SampleVisualQuestionAnsweringInputs;
      case textGuidedImagetoImage:
        return SampleTextGuidedImagetoImageInputs;
      case documentQuestionAnswering:
        return SampleDocumentQuestionAnsweringInputs;
      case image_classification:
      default:
        return SampleImageClassificationInputs;
    }
  };

  const getInputType = () => {
    switch (outputType) {
      case audioToText:
        return "audio";
      case textToText:
        return "text";
      case textToCode:
        return "text";
      case textConversation:
        return "text";
      case object_detection:
      case image_enhancement:
      case image_classification:
      case semantic_segmentation:
      case instance_segmentation:
      case styleTransfer:
      case styleTransfer:
      default:
        return "image";
    }
  };

  const renderContent = () => {
    if (props.trialOutput === undefined) {
      return (
        <QuickInput
          model={props.model}
          sampleInputs={getSampleInputs()}
          onRunModelClicked={props.onRunModelClicked}
        />
      );
    } else {
      return (
        <QuickOutput
          input={props.trialOutput.inputs[0]}
          features={
            props.trialOutput.completed_at
              ? props.trialOutput.results.responses[0].features
              : null
          }
          onBackClicked={props.onBackToModelClicked}
          compare={props.compare}
          trialOutput={props.trialOutput}
          inputType={getInputType()}
        />
      );
    }
  };

  if (!props.model) return <></>;

  return (
    <div className="model-detail-page">
      <Header />
      <ModelDetailHeader jumpRef={jumpRef} model={props.model} />
      <div className="model-detail-page__content">{renderContent()}</div>
      <ModelDescription jumpRef={jumpRef} model={props.model} />
    </div>
  );
};

export default ModelDetailPage;
