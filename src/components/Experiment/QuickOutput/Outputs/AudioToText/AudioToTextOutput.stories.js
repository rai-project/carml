import React from "react";
import AudioToTextOutput from "./AudioToTextOutput";
import { TestAudioToTextOutput } from "./testData/testAudioToTextOutput";

export default {
  title: "Experiments/Quick Output/Audio To Text",
  component: AudioToTextOutput,
};

const template = (args) => <AudioToTextOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestAudioToTextOutput };
