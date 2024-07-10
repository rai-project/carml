import React from "react";
import AudioClassificationOutput from "./AudioClassificationOutput";
import { TestAudioClassificationOutput } from "./testData/testAudioClassification";
import QuickOutput from "../../QuickOutput";

export default {
  title: "Experiments/Quick Output/Audio Classification",
  component: AudioClassificationOutput,
};

const template = (args) => <QuickOutput {...args} />;

export const Default = template.bind({});
Default.args = { trialOutput: TestAudioClassificationOutput, hideHeader: true };