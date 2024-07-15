import React from "react";
import TextToImageOutput from "./TextToImageOutput";
import { TestTextToImageOutput } from "./testData/testTextToImageOutput";
import QuickOutput from '../../QuickOutput';

export default {
  title: "Experiments/Quick Output/Text to Image",
  component: TextToImageOutput,
};

const template = (args) => <QuickOutput {...args} />;

export const Default = template.bind({});
Default.args = { trialOutput: TestTextToImageOutput, hideHeader: true, };
