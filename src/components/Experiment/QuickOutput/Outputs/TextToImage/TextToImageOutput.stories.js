import React from "react";
import TextToImageOutput from "./TextToImageOutput";
import { TestTextToImageOutput } from "./testData/testTextToImageOutput";

export default {
  title: "Experiments/Quick Output/Text to Image",
  component: TextToImageOutput,
};

const template = (args) => <TextToImageOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestTextToImageOutput };
