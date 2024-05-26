import {
  image_classification,
  image_enhancement,
  instance_segmentation,
  object_detection,
  semantic_segmentation,
  styleTransfer,
  textToText,
  textToCode,
  audioToText,
  textToAudio,
  textConversation,
  visualQuestionAnswering
} from "./TaskIDs";
import React, { Component } from "react";
import { ReactComponent as ImageClassification } from "../resources/icons/icon-imageClassification.svg";
import { ReactComponent as ObjectDetection } from "../resources/icons/icon-objectDetection.svg";
import { ReactComponent as SemanticSegmentation } from "../resources/icons/icon-semanticSegmentation.svg";
import { ReactComponent as InstanceSegmentation } from "../resources/icons/icon-instanceSegmentation.svg";
import { ReactComponent as ImageEnhancement } from "../resources/icons/icon-imageEnhancement.svg";
import { ReactComponent as StyleTransfer } from "../resources/icons/icon-styleTransfer.svg";
import { ReactComponent as TextToText } from "../resources/icons/icon-textToText.svg";
import { ReactComponent as TextToCode } from "../resources/icons/icon-textToCode.svg";
import { ReactComponent as AudioToText } from "../resources/icons/icon-audioToText.svg";
import { ReactComponent as TextToAudio } from "../resources/icons/icon-textToAudio.svg";
import { ReactComponent as TextConversation } from "../resources/icons/icon-textConversation.svg";
import { ReactComponent as VisualQuestionAnswering } from "../resources/icons/icon-visualQuestionAnswering.svg";

import {
  DefaultImageClassificationModel,
  DefaultImageEnhancementModel,
  DefaultInstanceSegmentationModel,
  DefaultObjectDetectionModel,
  DefaultSemanticSegmentationModel,
  DefaultTextModel,
  DefaultAudioToTextModel,
  DefaultTextToAudioModel,
  DefaultTextConversationModel,
  DefaultStyleTransferModel,
  DefaultVisualQuestionAnsweringModel
} from "./DefaultModels";
import {
  SampleImageClassificationInputs,
  SampleImageEnhancementInputs,
  SampleObjectDetectionInputs,
  SampleSegmentationInputs,
  SampleStyleTransferInputs,
  SampleVisualQuestionAnsweringInputs,
} from "./sampleImages";
import { TestImageClassificationResult } from "../components/Experiment/QuickOutput/Outputs/Classification/Features";
import { TestImageEnhancementData } from "../components/Experiment/QuickOutput/Outputs/ImageEnhancement/testData/TestFeatures";
import { TestObjectDetectionResult } from "../components/Experiment/QuickOutput/Outputs/ObjectDetection/testData/TestFeatures";
import { TestImageSegmentationResult } from "../components/Experiment/QuickOutput/Outputs/SemanticSegmentation/testData/TestFeatures";
import { TestInstanceSegmentationOutput } from "../components/Experiment/QuickOutput/Outputs/InstanceSegmentation/testData/TestFeatures";
import { TestTextOutput } from "../components/Experiment/QuickOutput/Outputs/Text/testData/testTextOutput";
import { TestAudioToTextOutput } from "../components/Experiment/QuickOutput/Outputs/AudioToText/testData/testAudioToTextOutput";
import { TestTextToAudioOutput } from "../components/Experiment/QuickOutput/Outputs/TextToAudio/testData/testTextToAudioOutput";
import { TestTextConversationOutput } from "../components/Experiment/QuickOutput/Outputs/TextConversation/testData/testTextConversationOutput";
import { TaskInputTypes } from "./TaskInputTypes";
import { TestStyleTransferOutput } from "../components/Experiment/QuickOutput/Outputs/StyleTransfer/testData/testStyleTransferOutput";
import TextInputTab from "../components/Experiment/QuickInput/Tabs/TextInput/TextInputTab";

export default class Task {
  static image_classification = new Task({
    name: "Classification",
    description:
      "Used to recognize a single object in an image and can help you answer what is in the image.",
    modelDescription:
      "Used to recognize a single object in an image and can help you answer what is in the image.",
    id: image_classification,
    inputText: "See how well this model can identify the object.",
    outputText: "How this model identified the object in this image:",
    icon: (props) => <ImageClassification {...props} />,
    sampleInputs: SampleImageClassificationInputs,
    tutorialDescription:
      "Image classification models can recognize a single object in an image.",
  });
  static click_through_rate = new Task({
    name: "Click-Through Rate",
    description: "[insert click-through rate description here]",
  });
  static image_object_detection = new Task({
    name: "Object detection",
    description:
      "Used to recognize and locate multiple objects in an image (for example, humans, animals, cars), and can help you answer what is in the image and where in the image is it located.",
    id: object_detection,
    inputText:
      "See how well this model can recognize and locate multiple objects in an image.",
    outputText: "Objects recognized in this image:",
    icon: (props) => <ObjectDetection {...props} />,
    sampleInputs: SampleObjectDetectionInputs,
    tutorialDescription:
      "Object detection models identify where objects are in an image.",
  });
  static image_semantic_segmentation = new Task({
    name: "Semantic segmentation",
    description:
      "Used to segment out different parts of an image that belong to the same class. Can help you answer what is in the image, where in the image it is located, and if similar object overlap.",
    id: semantic_segmentation,
    inputText:
      "See how well this model can recognize and locate multiple objects in an image and where they overlap.",
    outputText: "Objects recognized in this image:",
    icon: (props) => <SemanticSegmentation {...props} />,
    sampleInputs: SampleSegmentationInputs,
    tutorialDescription:
      "Semantic segmentation models recognize categories of objects in an image. They assign a category to every pixel in an image.",
  });
  static image_instance_segmentation = new Task({
    name: "Instance segmentation",
    description:
      "Used to segment out every distinct object in an image. Can help you answer what is in the image, where in the image it is located, and how many distinct objects there are.",
    inputText:
      "See how well this model can recognize and locate multiple distinct objects in an image.",
    outputText: "Objects recognized in this image:",
    icon: (props) => <InstanceSegmentation {...props} />,
    sampleInputs: SampleSegmentationInputs,
    tutorialDescription:
      "Instance Segmentation models recognize very specific categories of objects in an image. They assign a category to every pixel in an image.",
    id: instance_segmentation,
  });
  static image_enhancement = new Task({
    name: "Image enhancement",
    description:
      "Used to sharpen an image and bring out details. Can help you focus or pick out important features in an image.",
    id: image_enhancement,
    inputText: "See how well this model can improve the details of an image.",
    outputText: "Enhanced image:",
    icon: (props) => <ImageEnhancement {...props} />,
    sampleInputs: SampleImageEnhancementInputs,
    tutorialDescription:
      "Image enhancement models improve the resolution of an image, making it crisper and clearer.",
  });
  static style_transfer = new Task({
    name: "Style Transfer",
    description:
      "Used to convert one image into the artistic style of a second image",
    id: styleTransfer,

    // inputText: "Old inputText",
    // inputType: TaskInputTypes.Image,

    inputs: [
      {
        inputText: 'have its style changed.',
        inputType: TaskInputTypes.Image,

      },
      {
        inputText: 'use the style from.',
        inputType: TaskInputTypes.Image,
      }

    ],
    useMultiInput: true,
    // Note: This is just an example of what a config field could look like, not currently used
    config: {
      numWarmups: 0
    },

    outputText: "Stylized image:",
    icon: (props) => <StyleTransfer {...props} />,
    sampleInputs: SampleStyleTransferInputs,
    tutorialDescription:
      "Style transfer models convert one image into the artistic style of the second image.",
  });
  static text_to_text = new Task({
    name: "Text to Text",
    description: "[insert text description here]",
    id: textToText,
    inputText: "[insert text input help text here]",
    outputText: "[insert text output help text here]",
    icon: (props) => <TextToText {...props} />,
    sampleInputs: [],
    tutorialDescription: "[insert text tutorial page description here]",
    inputType: TaskInputTypes.Text,
  });
  static text_to_code = new Task({
    name: "Text to Code",
    description: "[insert text to code description here]",
    id: textToCode,
    inputText: "[insert text to code input help text here]",
    outputText: "[insert text to code output help text here]",
    icon: (props) => <TextToCode {...props} />,
    sampleInputs: [],
    tutorialDescription: "[insert text to code tutorial page description here]",
    inputType: TaskInputTypes.Text,
  });
  static audio_to_text = new Task({
    name: "Audio to Text",
    description: "Used to transcribe an audio file to text. Can help you understand what is said.",
    id: audioToText,
    inputText: "see how well this model can recognize and transcribe an audio (voice) input.",
    outputText: "Transcribed text:",
    icon: (props) => <AudioToText {...props} />,
    sampleInputs: [],
    tutorialDescription: "Audio to text models transcribe audio files, allowing you to read what is said.",
    inputType: TaskInputTypes.Audio,
  });
  static text_to_audio = new Task({
    name: "Text to Audio",
    description: "Used to generate an audio file from a text request.",
    id: textToAudio,
    inputText: "See how well this model can generate audio from inputted text.",
    outputText: "Play the file below to listen to the generated audio file.",
    icon: (props) => <TextToAudio {...props} />,
    sampleInputs: [],
    tutorialDescription: "Text to audio models bring your written words to life.",
    inputType: TaskInputTypes.Text,
    hideUpload: true,
  });
  static text_conversation = new Task({
    name: "Conversation",
    description: "Converse with a virtual assistant in real-time",
    id: textConversation,
    inputText: "begin a conversation.",
    outputText: "Conversational responses from the virtual assistant",
    icon: (props) => <TextConversation {...props} />,
    sampleInputs: [],
    tutorialDescription: "Type a question and receive a response from a virtual assistant",
    inputType: TaskInputTypes.Text,
    hideUpload: true,
  });
  static visual_question_answering = new Task({
    name: "Visual Question Answering",
    description: "Used to answer questions based on visual input.",
    id: visualQuestionAnswering,

    inputs: [
      {
        inputText: 'Visual Input.',
        inputType: TaskInputTypes.Image,

      },
      {
        inputText: 'Questions here',
        inputType: TaskInputTypes.Text,
        inputUpload: false,
        inputUrl: false,
        defaultTab: {
          "id": "text-input",
          "title": "Text",
          "component": TextInputTab
      }
      }

    ],
    useMultiInput: true,
    // Note: This is just an example of what a config field could look like, not currently used
    config: {
      numWarmups: 0
    },

    outputText: "Response to the question:",
    icon: (props) => <VisualQuestionAnswering {...props} />,
    sampleInputs: SampleVisualQuestionAnsweringInputs,
    tutorialDescription:
      "Visual Question Answering models answer questions based on visual input.",
  });


  constructor(options) {
    this.name = options.name ?? "";
    this.id = options.id ?? this.name;
    this.description = options.description ?? "";
    this.modelDescription = options.modelDescription ?? this.description;
    this.inputText = options.inputText ?? "";
    this.inputs = options.inputs ?? [];  // TODO: Update this to be only input-related field, and remove inputText and inputType
    this.useMultiInput = options.useMultiInput ?? false;
    this.multiple = options.multiple ?? false;  // This is used to allow multiple selections from one input
    this.outputText = options.outputText ?? "";
    this.Icon = options.icon ?? ((props) => <></>);
    this.defaultModel = Task.getDefaultModel(this.id);
    this.sampleInputs = options.sampleInputs ?? [];
    this.tutorialDescription = options.tutorialDescription ?? this.description;
    this.inputType = options.inputType ?? TaskInputTypes.Image;
    this.hideUpload = options.hideUpload ?? false;
  }

  static getStaticTask(taskId) {
    switch (taskId) {
      case image_classification:
      case Task.image_classification.name:
        return Task.image_classification;
      case image_enhancement:
      case Task.image_enhancement.name:
        return Task.image_enhancement;
      case object_detection:
      case Task.image_object_detection.name:
        return Task.image_object_detection;
      case semantic_segmentation:
      case Task.image_semantic_segmentation.name:
        return Task.image_semantic_segmentation;
      case instance_segmentation:
      case Task.image_instance_segmentation.name:
        return Task.image_instance_segmentation;
      case styleTransfer:
        return Task.style_transfer;
      case textToText:
        return Task.text_to_text;
      case textToCode:
        return Task.text_to_code;
      case audioToText:
        return Task.audio_to_text;
      case textToAudio:
        return Task.text_to_audio;
      case textConversation:
        return Task.text_conversation;
      case visualQuestionAnswering:
        return Task.visual_question_answering;
      default:
        return new Task({ name: "unknown", description: "unknown task name" });
    }
  }

  static getDefaultModel(taskId) {
    switch (taskId) {
      case image_classification:
        return DefaultImageClassificationModel;
      case image_enhancement:
        return DefaultImageEnhancementModel;
      case object_detection:
        return DefaultObjectDetectionModel;
      case semantic_segmentation:
        return DefaultSemanticSegmentationModel;
      case instance_segmentation:
        return DefaultInstanceSegmentationModel;
      case styleTransfer:
        return DefaultStyleTransferModel;
      case textToText:
        return DefaultTextModel;
      case textToCode:
        // Should this be different from text-to-text?
        return DefaultTextModel;
      case audioToText:
        return DefaultAudioToTextModel;
      case textToAudio:
        return DefaultTextToAudioModel;
      case textConversation:
        return DefaultTextConversationModel;
      case visualQuestionAnswering:
        return DefaultVisualQuestionAnsweringModel;
      default:
        return undefined;
    }
  }

  static getSampleOutput(taskId) {
    switch (taskId) {
      case image_classification:
        return TestImageClassificationResult;
      case image_enhancement:
        return TestImageEnhancementData;
      case object_detection:
        return TestObjectDetectionResult;
      case semantic_segmentation:
        return TestImageSegmentationResult;
      case instance_segmentation:
        return TestInstanceSegmentationOutput;
      case styleTransfer:
        return TestStyleTransferOutput;
      case textToText:
        return TestTextOutput;
      case audioToText:
        return TestAudioToTextOutput;
      case textToAudio:
        return TestTextToAudioOutput;
      case textConversation:
        return TestTextConversationOutput;
      case visualQuestionAnswering:
        return undefined; // TODO: Add test data
      default:
        return undefined;
    }
  }

  static getStaticTasks() {
    return [
      this.getStaticTask(image_classification),
      this.getStaticTask(object_detection),
      this.getStaticTask(image_enhancement),
      this.getStaticTask(semantic_segmentation),
      this.getStaticTask(instance_segmentation),
      this.getStaticTask(styleTransfer),
      this.getStaticTask(textToText),
      this.getStaticTask(textToCode),
      this.getStaticTask(textConversation),
      this.getStaticTask(textToAudio),
      this.getStaticTask(audioToText),
      this.getStaticTask(visualQuestionAnswering),
    ];
  }

  static getDemoTasks() {
    return [
      this.getStaticTask(image_classification),
      this.getStaticTask(object_detection),
      this.getStaticTask(image_enhancement),
      this.getStaticTask(semantic_segmentation),
      this.getStaticTask(instance_segmentation),
      // Note: Don't add new tasks here; 
      // These are just examples on the Home Page
    ];
  }
}
