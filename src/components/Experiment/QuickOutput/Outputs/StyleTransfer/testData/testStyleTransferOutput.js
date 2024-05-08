export const TestStyleTransferOutputGeneratedToken = {
    id: "sampleStyleTransferIdHere"
};

export const TestStyleTransferOutput = {
    id: "sampleStyleTransferOutputIdHere",
    inputs: [
        {
            src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/plane-blue.jpg",
            alt: "airplane",
        },
        {
            src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/puppies.jpg",
            alt: "puppies",
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
                        src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
                        alt: "bird",
                    },
                ], 
                'id': "sampleStyleTransferOutputResponseIdHere"
            }
        ]
    }
}