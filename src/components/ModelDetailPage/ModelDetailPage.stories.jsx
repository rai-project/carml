import React from "react";

import ModelDetailPage from "./ModelDetailPage";
import kitty from "../../stories/assets/kitty.png";
import {
  image_classification,
  image_enhancement,
  instance_segmentation,
  object_detection,
  semantic_segmentation,
  textToText,
  textToCode,
  textConversation,
} from "../../helpers/TaskIDs";
import { TestObjectDetectionResult } from "../Experiment/QuickOutput/Outputs/ObjectDetection/testData/TestFeatures";
import { TestImageSegmentationResult } from "../Experiment/QuickOutput/Outputs/SemanticSegmentation/testData/TestFeatures";
import {
  TestImageEnhancementData,
  TestImageEnhancementData2,
} from "../Experiment/QuickOutput/Outputs/ImageEnhancement/testData/TestFeatures";
import { TestImageClassificationResult } from "../Experiment/QuickOutput/Outputs/Classification/Features";
import { TestInstanceSegmentationOutput } from "../Experiment/QuickOutput/Outputs/InstanceSegmentation/testData/TestFeatures";
import { TestTextOutput } from "../Experiment/QuickOutput/Outputs/Text/testData/testTextOutput";
import { TestTextToCodeOutput } from "../Experiment/QuickOutput/Outputs/TextToCode/testData/testTextToCodeOutput";
import { TaskInputTypes } from "../../helpers/TaskInputTypes";

export default {
  title: "Models/Model Detail Page",
  component: ModelDetailPage,
};

const Template = (args) => <ModelDetailPage key="StandardModelDetailPage" {...args} />;

const makeArgs = (type, output = undefined) => ({
  trialOutput: output,
  model: {
    id: 13,
    created_at: "2022-01-10T20:03:19.910198Z",
    updated_at: "2022-01-10T20:03:19.910198Z",
    attributes: {
      Top1: "78.56",
      Top5: "94.43",
      kind: "CNN",
      manifest_author: "Cheng Li",
      training_dataset: "ImageNet",
    },
    description:
      "This is a made up example of a model that supports multiple machines\n",
    model: {
      graph_checksum: "",
      graph_path: "model-symbol.json",
      weights_checksum: "",
      weights_path: "model-0000.params",
    },
    framework: {
      id: 1,
      name: "MXNet",
      version: "1.7.0",
      architectures: [
        {
          name: "amd64",
        },
        {
          name: "ILLIAC",
        },
      ],
    },
    input: {
      description: "",
      type: "",
    },
    license: "unrestricted",
    name: "Fakenet22",
    output: {
      description: "the output label",
      type: type,
    },
    version: "2.22",
    url: {
      citation: "https://github.com",
      github: "https://github.com",
      link1: "https://pytorch.org/vision/stable/models.html",
      link2: "https://pytorch.org/vision/stable/models.html",
    },
  },
});

export const ImageClassification = Template.bind({});
ImageClassification.args = makeArgs(image_classification);

export const ImageClassificationOutput = Template.bind({});
ImageClassificationOutput.args = makeArgs(
  image_classification,
  TestImageClassificationResult
);

export const WithPendingTrialOutput = Template.bind({});
WithPendingTrialOutput.args = {
  key: "ModelDetailPageWithPendingTrialOutput",
  model: {
    id: 13,
    created_at: "2022-01-10T20:03:19.910198Z",
    updated_at: "2022-01-10T20:03:19.910198Z",
    attributes: {
      Top1: "78.56",
      Top5: "94.43",
      kind: "CNN",
      manifest_author: "Cheng Li",
      training_dataset: "ImageNet",
    },
    description:
      "This is a made up example of a model that supports multiple machines\n",
    model: {
      graph_checksum: "",
      graph_path: "model-symbol.json",
      weights_checksum: "",
      weights_path: "model-0000.params",
    },
    framework: {
      id: 1,
      name: "MXNet",
      version: "1.7.0",
      architectures: [
        {
          name: "amd64",
        },
        {
          name: "ILLIAC",
        },
      ],
    },
    input: {
      description: "",
      type: "",
    },
    license: "unrestricted",
    name: "Fakenet22",
    output: {
      description: "the output label",
      type: "image_classification",
    },
    version: "2.22",
    url: {
      citation: "https://github.com",
      github: "https://github.com",
      link1: "https://pytorch.org/vision/stable/models.html",
      link2: "https://pytorch.org/vision/stable/models.html",
    },
  },
  trialOutput: {
    id: "7618d464-b5ed-432f-8f88-b33504c6bb0a",
    inputs: [kitty],
  },
};

export const ObjectDetection = Template.bind({});
ObjectDetection.args = makeArgs(object_detection);

export const ObjectDetectionOutput = Template.bind({});
ObjectDetectionOutput.args = makeArgs(
  object_detection,
  TestObjectDetectionResult
);

export const SemanticSegmentation = Template.bind({});
SemanticSegmentation.args = makeArgs(semantic_segmentation);

export const SemanticSegmentationOutput = Template.bind({});
SemanticSegmentationOutput.args = makeArgs(
  semantic_segmentation,
  TestImageSegmentationResult
);

export const ImageEnhancement = Template.bind({});
ImageEnhancement.args = makeArgs(image_enhancement);

export const ImageEnhancementOutput = Template.bind({});
ImageEnhancementOutput.args = makeArgs(
  image_enhancement,
  TestImageEnhancementData
);

export const ImageEnhancementOutputVertical = Template.bind({});
ImageEnhancementOutputVertical.args = makeArgs(
  image_enhancement,
  TestImageEnhancementData2
);

export const InstanceSegmentation = Template.bind({});
InstanceSegmentation.args = makeArgs("image_instance_segmentation");

export const InstanceSegmentationOutput = Template.bind({});
InstanceSegmentationOutput.args = makeArgs(
  instance_segmentation,
  TestInstanceSegmentationOutput
);

export const Text = Template.bind({});
Text.args = makeArgs(textToText);

export const TextPendingOutput = Template.bind({});
TextPendingOutput.args = makeArgs(textToText, {
  id: "7618d464-b5ed-432f-8f88-b33504c6bb0a",
  inputs: ["Translate into Spanish: Hello, how are you?"],
});

export const TextConversationPendingOutput = Template.bind({});
TextConversationPendingOutput.args = makeArgs(textConversation, {
  id: "7618d464-b5ed-432f-8f88-b33504c6bb0a",
  inputs: [{src: "What is the meaning of life?", inputType: TaskInputTypes.Text}],
});

export const TextOutput = Template.bind({});
TextOutput.args = makeArgs(textToText, TestTextOutput);

export const TextToCode = Template.bind({});
TextToCode.args = makeArgs(textToCode);

export const TextToCodePendingOutput = Template.bind({});
TextToCodePendingOutput.args = makeArgs(textToCode, {
  id: "7618d464-b5ed-432f-8f88-b33504c6bb0a",
  inputs: ["def hello():\n    print('hello')"],
});

export const TextToCodeOutput = Template.bind({});
TextToCodeOutput.args = makeArgs(textToCode, TestTextToCodeOutput);
