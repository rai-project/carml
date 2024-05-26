import { audioToText, styleTransfer, textToAudio, textToText } from "./TaskIDs";

export const DefaultImageClassificationModel = {
  id: 1,
  created_at: "2022-04-29T20:46:37.909071Z",
  updated_at: "2022-04-29T20:46:37.909071Z",
  attributes: {
    Top1: "54.92",
    Top5: "78.03",
    kind: "CNN",
    manifest_author: "Cheng Li",
    training_dataset: "ImageNet",
  },
  description:
    "MXNet Image Classification model, which is trained on the ImageNet dataset. Use AlexNet from GluonCV model zoo.\n",
  short_description:
    "AlexNet is one of the earliest convolutional neural network for image classification. The pretrained network can classify images into 1000 object categories, such as keyboard, mouse, pencil, and many animals.",
  model: {
    graph_checksum: "4abd57ec8863ff3e3e29ecd4ead43d1f",
    graph_path: "model-symbol.json",
    weights_checksum: "906234b2a6b14bedac2dcccba8178529",
    weights_path: "model-0000.params",
  },
  framework: {
    id: 1,
    name: "MXNet",
    version: "1.7.0",
    architectures: [{ name: "amd64" }],
  },
  input: { description: "", type: "" },
  license: "unrestricted",
  name: "AlexNet",
  output: { description: "the output label", type: "image_classification" },
  url: {
    github:
      "https://github.com/apache/incubator-mxnet/blob/master/python/mxnet/gluon/model_zoo/vision/alexnet.py",
    citation:
      "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    link1: "",
    link2: "",
  },
  version: "1.0",
};

export const DefaultSemanticSegmentationModel = {
  id: 187,
  created_at: "2022-04-29T20:48:49.356047Z",
  updated_at: "2022-04-29T20:48:49.356047Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Cheng Li",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Semantic Segmentation model, which is trained on the COCO (Common Objects in Context) dataset. Use mobilenetv2_coco_voc_trainval(deeplabv3_mnv2_pascal_trainval_2018_01_29) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for  semantic image segmentation. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "bfc503739d93cedf973f82a5df1901eb",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_pascal_trainval_2018_01_29/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [{ name: "amd64" }],
  },
  input: { description: "", type: "" },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_PASCAL_VOC_Train_Val",
  output: {
    description: "the output semantic segment",
    type: "image_semantic_segmentation",
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_PASCAL_VOC_Train_Val.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};

export const DefaultObjectDetectionModel = {
  id: 191,
  created_at: "2022-04-29T20:48:52.096056Z",
  updated_at: "2022-04-29T20:48:52.096056Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "COCO",
  },
  description:
    "TensorFlow Object Detection model, which is trained on the COCO (Common Objects in Context) dataset. Use faster_rcnn_inception_resnet_v2_atrous_lowproposals_coco_2018_01_28 from TensorFlow detection model zoo.\n",
  short_description: "",
  model: {
    graph_checksum: "558d79ebf9b67164f412c841690aba8d",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/faster_rcnn_inception_resnet_v2_atrous_lowproposals_coco_2018_01_28/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [{ name: "amd64" }],
  },
  input: { description: "", type: "" },
  license: "Apache License, Version 2.0",
  name: "Faster_RCNN_Inception_ResNet_v2_Atrous_Lowproposals_COCO",
  output: {
    description: "the output bounding box",
    type: "image_object_detection",
  },
  url: {
    github:
      "http://download.tensorflow.org/models/object_detection/faster_rcnn_inception_resnet_v2_atrous_lowproposals_coco_2018_01_28.tar.gz",
    citation: "https://arxiv.org/abs/1506.01497",
    link1: "",
    link2: "",
  },
  version: "1.0",
};

export const DefaultImageEnhancementModel = {
  id: 106,
  created_at: "2022-04-29T20:47:54.166917Z",
  updated_at: "2022-04-29T20:47:54.166917Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Yen-Hsiang Chang",
    training_dataset: "VOC",
  },
  description:
    "This model is a replication of the model described in the SRGAN publication.\n",
  short_description:
    "SRGAN is a generative adversarial network for single image super-resolution.",
  model: {
    graph_checksum: "4527947ddf80f3da2bc9a216b6fb813b",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/onnxruntime/srgan.onnx",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 2,
    name: "Onnxruntime",
    version: "1.6.0",
    architectures: [{ name: "amd64" }],
  },
  input: { description: "", type: "" },
  license: "unrestricted",
  name: "SRGAN",
  output: { description: "the output image", type: "image_enhancement" },
  url: {
    github:
      "https://github.com/eriklindernoren/PyTorch-GAN/blob/master/implementations/srgan/srgan.py",
    citation: "https://arxiv.org/abs/1609.04802",
    link1: "https://github.com/brade31919/SRGAN-tensorflow",
    link2: "",
  },
  version: "1.0",
};

export const DefaultInstanceSegmentationModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Semantic Segmentation model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for  semantic image segmentation. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "",
    type: "",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "the output semantic segment",
    type: "image_instance_segmentation",
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};

// Note, this is a copy/paste of Image Segmentation
export const DefaultStyleTransferModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Style Transfer model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for  semantic image segmentation. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "",
    type: "",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "the output semantic segment",
    type: styleTransfer,
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};  

// Note, this is the same as Image Segmentation
export const DefaultTextModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Semantic Segmentation model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for  semantic image segmentation. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "",
    type: "text",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "the output semantic segment",
    type: textToText,
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};

// Note, this is the same as Image Segmentation with minor changes to description etc
export const DefaultAudioToTextModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Audio To Text model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for semantic audio transcrption. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "audio to be transcribed",
    type: "audio",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "the transcribed text of the audio",
    type: audioToText,
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};

// Note, this is the same as Image Segmentation with minor changes to description etc
export const DefaultTextToAudioModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "Riffusion Text to Audio model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for semantic audio transcrption. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "Riffusion",
    version: "1.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "text to be converted to audio",
    type: "text",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "Audio version of the inputted text",
    type: textToAudio,
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};

// Note, this is the same as Image Segmentation with minor changes to description etc
export const DefaultTextConversationModel = {
  id: 184,
  created_at: "2022-04-29T20:48:47.370171Z",
  updated_at: "2022-04-29T20:48:47.370171Z",
  attributes: {
    Top1: "",
    Top5: "",
    kind: "CNN",
    manifest_author: "Jingning Tang",
    training_dataset: "PASCAL VOC 2012",
  },
  description:
    "TensorFlow Chatbot model, which is trained on the COCO (Common Objects in Context) dataset. Use deeplabv3_mnv2_dm05_pascal_train_aug(deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01) from TensorFlow DeepLab Model Zoo.\n",
  short_description:
    "DeepLabv3 is a deep convolutional neural networks for semantic chatbotness. It employ atrous convolution in cascade or in parallel to capture multi-scale context by adopting multiple atrous rates.",
  model: {
    graph_checksum: "0336ceb67b378df8ada0efe9eadb5ac8",
    graph_path:
      "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/deeplabv3_mnv2_dm05_pascal_train_aug_2018_10_01/frozen_inference_graph.pb",
    weights_checksum: "",
    weights_path: "",
  },
  framework: {
    id: 4,
    name: "TensorFlow",
    version: "1.14.0",
    architectures: [
      {
        name: "amd64",
      },
    ],
  },
  input: {
    description: "text to be responded to",
    type: "text",
  },
  license: "Apache License, Version 2.0",
  name: "DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug",
  output: {
    description: "the chatbot's response to the inputted text",
    type: audioToText,
  },
  url: {
    github:
      "https://github.com/rai-project/tensorflow/blob/master/builtin_models/DeepLabv3_MobileNet_v2_DM_05_PASCAL_VOC_Train_Aug.yml",
    citation: "https://arxiv.org/pdf/1802.02611v3.pdf",
    link1: "https://arxiv.org/pdf/1706.05587.pdf",
    link2: "",
  },
  version: "1.0",
};


export const DefaultVisualQuestionAnsweringModel = {
  // TO BE ADDED HERE
};