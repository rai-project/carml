import React from "react";
import TextToAudioOutput from "./TextToAudioOutput";
import { TestTextToAudioOutput } from "./testData/testTextToAudioOutput";

export default {
  title: "Experiments/Quick Output/Text to Audio",
  component: TextToAudioOutput,
};

const template = (args) => <TextToAudioOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestTextToAudioOutput };
