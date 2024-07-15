import { DefaultVisualQuestionAnsweringModel } from "../../../../../../helpers/DefaultModels";

export const TestVisualQuestionAnsweringGeneratedToken = {
    id: "sampleVisualQuestionAnsweringOutputIdHere"
};

export const TestVisualQuestionAnswering = {
    id: "sampleVisualQuestionAnsweringOutputIdHere",
    inputs: [
        {
            src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
            description: "yellow dog.png",
            inputType: "image"
        },
        {
            description: "Hello  World",
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
                        id: "62a9f38e2bbc470001e3ce98",
                        type: "TEXT",
                        text: "Luigi sagte mir oft, er wollte nie, dass die Brüder vor",
                    },
                ],
                'id': "sampleVisualQuestionAnsweringIdHere"
            }
        ]
    },
    model: DefaultVisualQuestionAnsweringModel,
};