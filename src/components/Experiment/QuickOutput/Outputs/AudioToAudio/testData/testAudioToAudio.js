import { DefaultAudioToAudioModel } from "../../../../../../helpers/DefaultModels";

export const TestAudioToAudioOutputGeneratedToken = {
    id: "sampleidhere"
};

export const TestAudioToAudioOutput = {
    id: "sampletestaudiotoaudiooutputidhere",
    inputs: [
        {
            title: "audio1.flac",
            src: "https://xlab1.netlify.app/audio-to-audio-input.flac"
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
                        title: "text-to-audio-output.flac",
                        src: "https://xlab1.netlify.app/audio-to-audio-output.flac",
                        type: 'AUDIO'
                    }
                ],
                'id': "sampletesttexttoaudiooutputresponseidhere"
            }
        ]
    },
    model: DefaultAudioToAudioModel,
};