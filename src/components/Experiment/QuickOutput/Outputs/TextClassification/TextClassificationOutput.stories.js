import React from "react";
import TextClassificationOutput from "./TextClassificationOutput";
import { TestTextClassificationOutput} from "./testData/testTextClassification";

export default {
  title: "Experiments/Quick Output/Text Classification",
  component: TextClassificationOutput,
};

const template = (args) => <TextClassificationOutput {...args} />;

export const Default = template.bind({});
Default.args = { trial: TestTextClassificationOutput };