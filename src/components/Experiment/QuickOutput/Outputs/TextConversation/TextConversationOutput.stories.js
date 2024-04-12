import React from "react";
import TextConversationOutput from "./TextConversationOutput";
import { TestTextConversationOutput, TestTextConversationOutput2 } from "./testData/testTextConversationOutput";

export default {
  title: "Experiments/Quick Output/Text Conversation",
  component: TextConversationOutput,
};

const template = (args) => <TextConversationOutput {...args} />;

const fakeOnSubmit = async (input, context) => {
    // Note: context param should contain the conversation history,
    // to be sent to the api

    // This is basically what "should" happen, uncomment to confirm in Storybook
    // see what values would be sent to the api
    // const api = GetApiHelper(); 
    // await api.runTrial(DefaultTextConversationModel, input, null, context);

    // Dummy response instead of actually calling api.runTrial above
    return TestTextConversationOutput2;
}

export const Default = template.bind({});
Default.args = { trial: TestTextConversationOutput, onSubmit: fakeOnSubmit};
