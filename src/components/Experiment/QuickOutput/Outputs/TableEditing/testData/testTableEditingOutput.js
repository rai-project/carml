import TableEditingInput from "../../../../../../resources/taskSample/tableEditing.csv";
import TableEditingOutput from "../../../../../../resources/taskSample/tableEditing-long.csv";

export const TestTableEditingGeneratedToken = {
    id: "sampleTableEditingIdHere"
};

export const TestTableEditingOutput = {
    id: "sampleTableEditingOutputIdHere",
    inputs: [
        {
            src: TableEditingInput,
            inputType: "csv"
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
                        src: TableEditingOutput,
                    },
                ], 
                'id': "sampleTableEditingOutputResponseIdHere"
            }
        ]
    }
}