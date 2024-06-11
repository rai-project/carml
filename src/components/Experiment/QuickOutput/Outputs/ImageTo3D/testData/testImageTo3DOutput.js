import DiamondRing from "./diamondRing.png"
import DiamondRing3D from "./3-stone-transformed.glb"


export const TestImageTo3DOutputGeneratedToken = {
    id: "sampleImageTo3DTokenIdHere"
};

export const TestImageTo3DOutput = {
    id: "sampleImageTo3DOutputIdHere",
    inputs: [
        {
            src: DiamondRing,
            alt: "diamond ring",
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
                        src: DiamondRing3D,
                        alt: "3D Diamond Ring",
                    },
                ], 
                'id': "sampleImageTo3DOutputResponseIdHere"
            }
        ]
    }
}