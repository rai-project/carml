import Drums3DOBJ from "./drums/object/drums.obj";
import Drums3DMTL from "./drums/object/drums.mtl";
import { SampleTextTo3DInputs } from "../../../../../../helpers/sampleImages";


export const TestTextTo3DOutputGeneratedToken = {
    id: "sampleTextTo3DTokenIdHere"
};

export const TestTextTo3DOutput = {
    id: "sampleTextTo3DOutputIdHere",
    inputs: SampleTextTo3DInputs,
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: { 
        'duration': "30.216154124s", 
        'duration_for_inference': "30.193807904s", 
        'responses': [
            {
                'features': [
                    {
                        model: Drums3DOBJ,
                        texture: Drums3DMTL,
                        type: '3D_MODEL'
                    },
                ], 
                'id': "sampleTextTo3DOutputResponseIdHere"
            }
        ]
    }
}