import Chair1 from "./chair/images/chair1.png";
import Chair2 from "./chair/images/chair2.png";
import Chair3 from "./chair/images/chair3.png";
import Chair4 from "./chair/images/chair4.png";
import Chair5 from "./chair/images/chair5.png";
import Chair3DOBJ from "./chair/object/chairs.obj";
import Chair3DMTL from "./chair/object/chairs.mtl";


export const TestImageTo3DOutputGeneratedToken = {
    id: "sampleImageTo3DTokenIdHere"
};

export const TestImageTo3DOutput = {
    id: "sampleImageTo3DOutputIdHere",
    inputs: [
        {
            src: Chair1,
            alt: "chair",
            inputType: "image"
        },       
        {
            src: Chair2,
            alt: "chair",
            inputType: "image"
        },
        {
            src: Chair3,
            alt: "chair",
            inputType: "image"
        },
        {
            src: Chair4,
            alt: "chair",
            inputType: "image"
        },
        {
            src: Chair5,
            alt: "chair",
            inputType: "image"
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
                        model: Chair3DOBJ,
                        texture: Chair3DMTL,
                        type: '3D_MODEL'
                    },
                ], 
                'id': "sampleImageTo3DOutputResponseIdHere"
            }
        ]
    }
}