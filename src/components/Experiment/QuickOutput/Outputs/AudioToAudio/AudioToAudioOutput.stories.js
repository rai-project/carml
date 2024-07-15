import React from "react";
import AudioToAudioOutput from "./AudioToAudioOutput";
import { TestAudioToAudioOutput } from "./testData/testAudioToAudio";
import QuickOutput from "../../QuickOutput";

export default {
  title: "Experiments/Quick Output/Audio to Audio",
  component: AudioToAudioOutput,
};

const template = (args) => <QuickOutput {...args} />;

export const Default = template.bind({});
Default.args = { trialOutput: TestAudioToAudioOutput, hideHeader: true, };
