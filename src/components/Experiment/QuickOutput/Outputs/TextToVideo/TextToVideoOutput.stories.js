import React from "react";
import TextToVideoOutput from "./TextToVideoOutput";
import { TestTextToVideoOutput } from "./testData/testTextToVideoOutput";

export default {
  title: "Experiments/Quick Output/Text to Video",
  component: TextToVideoOutput,
};

const template = (args) => <TextToVideoOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestTextToVideoOutput };
