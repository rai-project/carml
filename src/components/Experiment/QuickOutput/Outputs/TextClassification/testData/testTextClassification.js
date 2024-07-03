export const TestTextClassificationOutputGeneratedToken = {
  id: "sampleidhere"
};

export const TestTextClassificationOutput = {
  id: "sampletesttextclassificationoutputidhere",
  inputs: ["The weather is very pleasant today."],
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
                label: 'positive'
              },
              "probability": 0.9846002459526062
            },
            {
              classification: {
                "label": "neutral"
              },
              "probability": 0.012036120519042015

            },
            {
              classification: {
                "label": "negative"
              },
              "probability": 0.0033636766020208597
            }

          ],
        'id': "sampletesttextclassificationoutputresponseidhere"
      }
    ]
  }
};
