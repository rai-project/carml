import React from "react";
import AudioToAudioOutput from "./AudioToAudioOutput";
import { TestAudioToAudioOutput } from "./testData/testAudioToAudio";

export default {
  title: "Experiments/Quick Output/Audio to Audio",
  component: AudioToAudioOutput,
};

const template = (args) => <AudioToAudioOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestAudioToAudioOutput };
