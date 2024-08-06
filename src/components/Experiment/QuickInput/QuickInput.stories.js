import React from "react";
import QuickInput from "./QuickInput";
import {
  image_classification,
  image_enhancement,
  object_detection,
  semantic_segmentation,
  styleTransfer,
  textToText,
  textToCode,
  audioToText,
  textConversation,
  textToAudio,
  visualQuestionAnswering,
  textGuidedImageToImage,
  documentQuestionAnswering,
  textToImage,
  textToVideo,
  imageTo3D,
  imageToText,
  textTo3D,
  textClassification,
  audioToAudio,
  audioClassification,
  videoClassification,
  maskGeneration,
} from "../../../helpers/TaskIDs";
import {
  SampleImageClassificationInputs,
  SampleImageEnhancementInputs,
  SampleImageTo3DInputs,
  SampleObjectDetectionInputs,
  SampleSegmentationInputs,
  SampleStyleTransferInputs,
  SampleVisualQuestionAnsweringInputs,
  SampleTextGuidedImageToImageInputs,
  SampleDocumentQuestionAnsweringInputs,
  SampleTextToImageInputs,
  SampleTextToVideoInputs,
  SampleImageToTextInputs,
  SampleTextTo3DInputs,
  SampleTextClassificationInputs,
  SampleAudioToAudioInputs,
  SampleAudioClassificationInputs,
  SampleVideoClassificationInputs,
  SampleMaskGenerationInputs,
} from "../../../helpers/sampleImages";
import { QuickInputType } from "./quickInputType";
import { TaskInputTypes } from "../../../helpers/TaskInputTypes";

export default {
  title: "Experiments/Quick Input",
  component: QuickInput,
};

const Template = (args) => <QuickInput {...args} />;

export const ImageClassification = Template.bind({});
ImageClassification.args = {
  sampleInputs: SampleImageClassificationInputs,
  model: {
    output: {
      type: image_classification,
    },
  },
};

export const ObjectDetection = Template.bind({});
ObjectDetection.args = {
  sampleInputs: SampleObjectDetectionInputs,
  model: {
    output: {
      type: object_detection,
    },
  },
};

export const SemanticSegmentation = Template.bind({});
SemanticSegmentation.args = {
  sampleInputs: SampleSegmentationInputs,
  model: {
    output: {
      type: semantic_segmentation,
    },
  },
};

export const ImageEnhancement = Template.bind({});
ImageEnhancement.args = {
  sampleInputs: SampleImageEnhancementInputs,
  model: {
    output: {
      type: image_enhancement,
    },
  },
};

export const StyleTransfer = Template.bind({});
StyleTransfer.args = {
  sampleInputs: SampleStyleTransferInputs,
  model: {
    output: {
      type: styleTransfer,
    },
  },
};

export const ImageTo3D = Template.bind({});
ImageTo3D.args = {
  sampleInputs: SampleImageTo3DInputs,
  model: {
    output: {
      type: imageTo3D,
    },
  },
  onRunModelClicked: (inputs) => {
    console.log('inputs: ', inputs);
  }
};

export const MaskGeneration = Template.bind({});
MaskGeneration.args = {
  sampleInputs: SampleMaskGenerationInputs,
  model: {
    output: {
      type: maskGeneration,
    },
  },
};

export const Text = Template.bind({});
Text.args = {
  sampleInputs: [
    "The quick brown fox jumps over the lazy dog",
    "The five boxing wizards jump quickly",
    "look at the dog",
  ],
  model: {
    output: {
      type: textToText,
    },
  },
};

export const TextToCode = Template.bind({});
TextToCode.args = {
  sampleInputs: [
    "The quick brown fox jumps over the lazy dog",
    "The five boxing wizards jump quickly",
    "look at the dog",
  ],
  model: {
    output: {
      type: textToCode,
    },
  },
};

export const AudioToText = Template.bind({});
AudioToText.args = {
  sampleInputs: [
    {
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac",
      filename: "automatic-speech-recognition-input.flac",
      type: TaskInputTypes.Audio
    },
    {
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac",
      filename: "automatic-speech-recognition-input.flac",
      type: TaskInputTypes.Audio
    },
    {
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac",
      filename: "automatic-speech-recognition-input.flac",
      type: TaskInputTypes.Audio
    },
  ],
  model: {
    output: {
      type: audioToText,
    },
  },
};

export const TextToAudio = Template.bind({});
TextToAudio.args = {
  sampleInputs: [
    "a chill song with influences from lofi, chillstep and downtempo",
  ],
  model: {
    output: {
      type: textToAudio,
    },
  },
};

export const TextConversation = Template.bind({});
TextConversation.args = {
  sampleInputs: [
    "Show me a recipe for pizza",
    "What is the weather tomorrow?",
    "What is the meaning of life?",
  ],
  model: {
    output: {
      type: textConversation,
    },
  },
};


export const VisualQuestionAnswering = Template.bind({});
VisualQuestionAnswering.args = {
  sampleInputs: SampleVisualQuestionAnsweringInputs,
  model: {
    output: {
      type: visualQuestionAnswering,
    },
  },
};

export const TextGuidedImageToImage = Template.bind({});
TextGuidedImageToImage.args = {
  sampleInputs: SampleTextGuidedImageToImageInputs,
  model: {
    output: {
      type: textGuidedImageToImage,
    },
  },
};

export const DocumentQuestionAnswering = Template.bind({});
DocumentQuestionAnswering.args = {
  sampleInputs: SampleDocumentQuestionAnsweringInputs,
  model: {
    output: {
      type: documentQuestionAnswering,
    },
  },
};

export const TextToImage = Template.bind({});
TextToImage.args = {
  sampleInputs: SampleTextToImageInputs,
  model: {
    output: {
      type: textToImage,
    },
  },
};

export const TextToVideo = Template.bind({});
TextToVideo.args = {
  sampleInputs: SampleTextToVideoInputs,
  model: {
    output: {
      type: textToVideo,
    },
  },
};

export const ImageToText = Template.bind({});
ImageToText.args = {
  sampleInputs: SampleImageToTextInputs,
  model: {
    output: {
      type: imageToText,
    },
  },
};

export const TextTo3D = Template.bind({});
TextTo3D.args = {
  sampleInputs: SampleTextTo3DInputs,
  model: {
    output: {
      type: textTo3D,
    },
  },
};

export const TextClassification = Template.bind({});
TextClassification.args = {
  sampleInputs: SampleTextClassificationInputs,
  model: {
    output: {
      type: textClassification,
    },
  },
};

export const AudioToAudio = Template.bind({});
AudioToAudio.args = {
  sampleInputs: SampleAudioToAudioInputs,
  model: {
    output: {
      type: audioToAudio,
    },
  },
};

export const AudioClassification = Template.bind({});
AudioClassification.args = {
  sampleInputs: SampleAudioClassificationInputs,
  model: {
    output: {
      type: audioClassification,
    },
  },
};

export const VideoClassification = Template.bind({});
VideoClassification.args = {
  sampleInputs: SampleVideoClassificationInputs,
  model: {
    output: {
      type: videoClassification,
    },
  },
};