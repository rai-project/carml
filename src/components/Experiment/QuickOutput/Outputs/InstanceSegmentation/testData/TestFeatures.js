import {TestInstanceSegmentationMask} from "./TestMask";


export const TestInstanceSegmentationOutput = {
  "id": "9d52d414-cc78-4cd5-a292-afdc0b9332ec",
  "inputs": [
    {
      src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/cats-dogs.png",
      alt: "cat & dog",
      type: "IMAGE",
    }
  ],
  "completed_at": "2022-06-03T18:17:14.513854Z",
  "results": {
    "duration": "9.216154124s",
    "duration_for_inference": "9.193807904s",
    "responses": [
      {
        "features": [
          {
            id: "62a9f38e2bbc470001e3ce98",
            probability: 1,
            type: "SEMANTICSEGMENT",
            semantic_segment: {
              height: 159,
              width: 279,
              labels: ["background", "dog", "cat"],
              int_mask: TestInstanceSegmentationMask
            }
          }
        ]
      }
    ],
    "trace_id": {}
  },
  "model": {
    "id": 206,
    "created_at": "2022-04-29T20:49:01.393746Z",
    "updated_at": "2022-04-29T20:49:01.393746Z",
    "attributes": {
      "Top1": "",
      "Top5": "",
      "kind": "CNN",
      "manifest_author": "Cheng Li",
      "training_dataset": "COCO"
    },
    "description": "TensorFlow Instance Segmentation model, which is trained on the COCO (Common Objects in Context) dataset. Use mask_rcnn_inception_v2_coco_2018_01_28 from TensorFlow detection model zoo.\n",
    "short_description": "Mast_RCNN is a conceptually simple, flexible, and general framework for object instance segmentation. It   detects objects in an image while simultaneously generating a high-quality segmentation mask for each in- stance.",
    "model": {
      "graph_checksum": "b47e443b313a709e4c39c1caeaa3ecb3",
      "graph_path": "https://s3.amazonaws.com/store.carml.org/models/tensorflow/models/mask_rcnn_inception_v2_coco_2018_01_28/frozen_inference_graph.pb",
      "weights_checksum": "",
      "weights_path": ""
    },
    "framework": {
      "id": 4,
      "name": "TensorFlow",
      "version": "1.14.0",
      "architectures": [
        {
          "name": "amd64"
        }
      ]
    },
    "input": {
      "description": "",
      "type": ""
    },
    "license": "Apache License, Version 2.0",
    "name": "Mask_RCNN_Inception_v2_COCO",
    "output": {
      "description": "the output instance segment",
      "type": "image_instance_segmentation"
    },
    "url": {
      "github": "https://github.com/tensorflow/models/blob/master/research/object_detection/samples/configs/mask_rcnn_inception_v2_coco.config",
      "citation": "https://arxiv.org/abs/1703.06870",
      "link1": "",
      "link2": ""
    },
    "version": "1.0"
  }
}

export const TestInstanceSegmentationOutputNoFeatures = {
  id: "f5bbc476-1b25-497e-9e64-b2375b5f57c5",
  inputs: [
    "http://www.experian.com/blogs/news/wp-content/uploads/2012/06/cars.png",
  ],
  completed_at: "2022-04-20T20:39:06.359287Z",
  results: {
    "responses": [
      {
        "features": [],
        "id": "4b4847c5-5472-4208-9909-e03898ac692b",
        "input_id": "dd136544-d70e-49a5-9306-b480230ca2ea",
        "request_id": "698fc908-df66-4230-9e3b-b8248bc5481b"
      }
    ],
    "trace_id": {"id": "45fb5faa2c4321d0"}
  },
  model: {
    framework: {
      architectures: [
        {
          name: 'amd64'
        }
      ],
      name: 'PyTorch'
    },
    id: 27,
    name: 'TorchVision+ResNet18',
    output: {
      type: "image_instance_segmentation"
    }
  },

}

