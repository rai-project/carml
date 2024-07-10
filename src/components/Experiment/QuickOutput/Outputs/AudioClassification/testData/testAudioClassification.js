import { DefaultAudioClassificationModel } from "../../../../../../helpers/DefaultModels";

export const TestAudioClassificationOutputGeneratedToken = {
    id: "sampleidhere"
  };
  
  export const TestAudioClassificationOutput = {
    id: "sampletestaudioclassificationoutputidhere",
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
  
          'features':
            [
              {
                classification: {
                  label: 'eng'
                },
                "probability": 0.9846002459526062
              },
              {
                classification: {
                  "label": "lat"
                },
                "probability": 0.012036120519042015
  
              },
              {
                classification: {
                  "label": "frn"
                },
                "probability": 0.0033636766020208597
              }
  
            ],
          'id': "sampletestaudioclassificationoutputresponseidhere"
        }
      ]
    },
    model: DefaultAudioClassificationModel,
  };
  