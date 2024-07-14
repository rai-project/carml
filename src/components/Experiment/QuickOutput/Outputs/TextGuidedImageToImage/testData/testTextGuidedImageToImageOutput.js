import { DefaultTextGuidedImageToImageModel } from "../../../../../../helpers/DefaultModels";

export const TestTextGuidedImageToImageGeneratedToken = {
    id: "sampleTextGuidedImageToImageOutputIdHere"
};

export const TestTextGuidedImageToImage = {
    id: "sampleTextGuidedImageToImageOutputIdHere",
    inputs: [
        {
            src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
            alt: "yellow dog",
            inputType: "image"
        },
        {
            description: "Hello World",
            inputType: "text"
        }
    ],
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: {
        'duration': "9.216154124s",
        'duration_for_inference': "9.193807904s",
        'responses': [
            {
                'features': [
                    {
                        src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
                        alt: "painted dog",
                    },
                ],
                'id': "sampleTextGuidedImageToImageIdHere"
            }
        ]
    },
    model: DefaultTextGuidedImageToImageModel,
};