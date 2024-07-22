import React from "react";
import TextConversationOutput from "./TextConversationOutput";
import { TestTextConversationOutput, TestTextConversationOutput2 } from "./testData/testTextConversationOutput";
// import api from "../../../../../helpers/api"
// import GetApiHelper from "../../../../../helpers/api";
// import { DefaultTextConversationModel } from "../../../../../helpers/DefaultModels";

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
    // await api.runTrial(DefaultTextConversationModel, {src: input, inputType: "TEXT"}, null, context);

    // Dummy response instead of actually calling api.runTrial above, uncomment when finished testing
    return TestTextConversationOutput2;
}

export const Default = template.bind({});
Default.args = { trial: TestTextConversationOutput, onSubmit: fakeOnSubmit};
