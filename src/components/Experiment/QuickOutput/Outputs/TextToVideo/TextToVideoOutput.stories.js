import React from "react";
import TextToVideoOutput from "./TextToVideoOutput";
import { TestTextToVideoOutput } from "./testData/testTextToVideoOutput";
import QuickOutput from '../../QuickOutput';


export default {
  title: "Experiments/Quick Output/Text to Video",
  component: TextToVideoOutput,
};

const template = (args) => <QuickOutput {...args} />;

export const Default = template.bind({});
Default.args = { trialOutput: TestTextToVideoOutput, hideHeader: true };
