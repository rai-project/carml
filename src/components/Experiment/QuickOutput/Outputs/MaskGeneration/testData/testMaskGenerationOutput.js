import catDog from "../../../../../../stories/assets/catdog.jpg";
import { maskGeneration } from "../../../../../../helpers/TaskIDs";
import { TestMask } from "../../SemanticSegmentation/testData/TestMask";

export const TestMaskGenerationOutputGeneratedToken = {
    id: "sampleMaskGenerationTokenIdHere"
};

export const TestMaskGenerationOutput = {
    id: "sampleMaskGenerationOutputIdHere",
    inputs: [
        {
            src: catDog,// Need to update the SemanticSegmentation component?
            alt: "cat & dog",
            type: "IMAGE",
            xmax: 718,
            xmin: 45,
            ymax: 439,
            ymin: 90
        },             
    ],
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
          type: maskGeneration
        }
      },    
    completed_at: "2023-06-03T18:17:14.513854Z",
    // "results" is just copy/pasted from SemanticSegmentation
    results: {
        "duration": "492.161067ms",
        "duration_for_inference": "368.568412ms",
        "id": "48d3b998-6fa8-4bc9-bd42-46532c50e941",
        "responses": [
          {
            "features": [
              {
                "id": "61a686ad0653910001fd33ff",
                "probability": 1,
                "semantic_segment": {
                  "height": 480,
                  "int_mask": TestMask,
                  "labels": [
                    "background",
                    "aeroplane",
                    "bicycle",
                    "bird",
                    "boat",
                    "bottle",
                    "bus",
                    "car",
                    "cat",
                    "chair",
                    "cow",
                    "diningtable",
                    "dog",
                    "horse",
                    "motorbike",
                    "person",
                    "pottedplant",
                    "sheep",
                    "sofa",
                    "train",
                    "tvmonitor"
                  ],
                  "width": 639
                },
                "type": "SEMANTICSEGMENT"
              }
            ],
            "id": "ebc772e7-d9dd-4ca0-8a6f-041101a9850f",
            "input_id": "eace0cff-3721-40f7-8ef1-03d796928ade",
            "request_id": "f3087367-53da-4c61-a0f7-3fc8c0865f10"
          }
        ],
        "trace_id": {"id": "1e54862f7594eab3"}
    }
}