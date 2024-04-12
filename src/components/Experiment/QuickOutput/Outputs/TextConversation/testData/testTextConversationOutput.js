export const TestTextConversationOutputGeneratedToken = {
    id: "sampleidhere"
};

export const TestTextConversationOutput = {
    id: "sampletesttextconversationoutputidhere",
    inputs: [
        'Show me a recipe for pizza',
    ],
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: { 
        'duration': "9.216154124s", 
        'duration_for_inference': "9.193807904s", 
        'responses': [
            {
                'features': [
                    {
                        'role': 'assistant',
                        'text': 'Buy a frozen pizza and put it in the microwave for ten minutes', 
                        'type': 'TEXT'
                    }
                ], 
                'id': "sampletestaudiototextoutputresponseidhere"
            },            
        ]
    }
}

export const TestTextConversationOutput2 = {
    id: "sampletesttextconversationoutputidhere",
    inputs: [
        'Can I have a different recipe?',
    ],
    completed_at: "2023-06-03T18:17:14.513854Z",
    results: { 
        'duration': "9.216154124s", 
        'duration_for_inference': "7.233107566s", 
        'responses': [
            {
                'features': [
                    {
                        'role': 'assistant',
                        'text': 'Just order from Domino\'s website', 
                        'type': 'TEXT'
                    }
                ], 
                'id': "sampletestaudiototextoutputresponseidhere"
            },            
        ]
    }
}