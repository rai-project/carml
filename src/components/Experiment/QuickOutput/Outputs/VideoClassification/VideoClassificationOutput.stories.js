import React from "react";
import VideoClassificationOutput from "./VideoClassificationOutput";
import { TestVideoClassificationOutput } from "./testData/testVideoClassification";
import QuickOutput from "../../QuickOutput";

export default {
  title: "Experiments/Quick Output/Video Classification",
  component: VideoClassificationOutput,
};

const template = (args) => <QuickOutput {...args} />;

export const Default = template.bind({});
Default.args = { trialOutput: TestVideoClassificationOutput, hideHeader: true };