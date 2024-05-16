import StyleTransferContent from "../../../../../../resources/taskSample/styleTransferContent.jpg"
import StyleTransferStyle from "../../../../../../resources/taskSample/styleTransferStyle.jpg";
import StyleTransferResult from "../../../../../../resources/taskSample/styleTransferResult.png";


export const TestStyleTransferOutputGeneratedToken = {
    id: "sampleStyleTransferIdHere"
};

export const TestStyleTransferOutput = {
    id: "sampleStyleTransferOutputIdHere",
    inputs: [
        {
            src: StyleTransferContent,
            alt: "yellow dog",
        },
        {
            src: StyleTransferStyle,
            alt: "painting",
        },
    ],
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: { 
        'duration': "9.216154124s", 
        'duration_for_inference': "9.193807904s", 
        'responses': [
            {
                'features': [
                    {
                        src: StyleTransferResult,
                        alt: "painted dog",
                    },
                ], 
                'id': "sampleStyleTransferOutputResponseIdHere"
            }
        ]
    }
}