import { audioToText } from "../../../../../../helpers/TaskIDs";

export const TestAudioToTextOutputGeneratedToken = {
    id: "sampleidhere"
};

export const TestAudioToTextOutput = {
    id: "sampletestaudiototextoutputidhere",
    inputs: [
        {
            title: "automatic-speech-recognition-input.flac",
            src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
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
                        'text': 'Taco Bell hat erklärt, dass es bis 2022 2.000 Standorte in', 
                        'type': 'TEXT'
                    }
                ], 
                'id': "sampletestaudiototextoutputresponseidhere"
            }
        ]
    }
}