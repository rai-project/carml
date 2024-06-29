import React from "react";
import ImageToTextOutput from "./ImageToTextOutput";
import { TestImageToTextOutput } from "./testData/testImageToTextOutput";

export default {
  title: "Experiments/Quick Output/Image To Text",
  component: ImageToTextOutput,
};

const template = (args) => <ImageToTextOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestImageToTextOutput };
