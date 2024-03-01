import React from "react";
import QuickInput from "./QuickInput";
import {
  image_classification,
  image_enhancement,
  object_detection,
  semantic_segmentation,
  textToText,
  textToCode,
  audioToText,
} from "../../../helpers/TaskIDs";
import {
  SampleImageClassificationInputs,
  SampleImageEnhancementInputs,
  SampleObjectDetectionInputs,
  SampleSegmentationInputs,
} from "../../../helpers/sampleImages";

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
      title: "automatic-speech-recognition-input.flac",
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
    },
    {
      title: "automatic-speech-recognition-input(2).flac",
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
    },
    {
      title: "automatic-speech-recognition-input(3).flac",
      src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
    },    
  ],
  model: {
    output: {
      type: audioToText,
    },
  },
};
