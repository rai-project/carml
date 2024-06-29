export const TestImageToTextOutputGeneratedToken = {
  id: "sampletestimagetotextoutputidhere"
};

export const TestImageToTextOutput = {
  id: "sampletestimagetotextoutputidhere",
  inputs: [
      {
          src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/crabby.png",
          alt: "crab"
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
                      'text': 'A crab on the beach', 
                      'type': 'TEXT'
                  }
              ], 
              'id': "sampletestimagetotextoutputresponseidhere"
          }
      ]
  }
}