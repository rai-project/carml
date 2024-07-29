import { DefaultVideoClassificationModel } from "../../../../../../helpers/DefaultModels";

export const TestVideoClassificationOutputGeneratedToken = {
    id: "sampleidhere"
};

export const TestVideoClassificationOutput = {
    id: "sampletestvideoclassificationoutputidhere",
    inputs: [
        {
            description: "Video of a cat",
            src: "https://xlab1.netlify.app/samples/video/cat.mp4",
        },
    ],
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: {
        'duration': "9.216154124s",
        'duration_for_inference': "9.193807904s",
        'responses': [
            {

                'features':
                    [
                        {
                            classification: {
                                label: 'Cat'
                            },
                            "probability": 0.9846002459526062
                        },
                        {
                            classification: {
                                "label": "Lion"
                            },
                            "probability": 0.012036120519042015

                        },
                        {
                            classification: {
                                "label": "Dog"
                            },
                            "probability": 0.0033636766020208597
                        }

                    ],
                'id': "sampletestvideoclassificationoutputresponseidhere"
            }
        ]
    },
    model: DefaultVideoClassificationModel,
};
