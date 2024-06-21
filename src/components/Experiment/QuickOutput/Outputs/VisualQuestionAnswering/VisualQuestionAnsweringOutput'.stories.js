import React from 'react';
import { TestVisualQuestionAnswering } from './testData/testVisualQuestionAnsweringOutput'
import VisualQuestionAnsweringOutput from './VisualQuestionAnsweringOutput';
export default {
  title: "Experiments/Quick Output/Visual Question Answering",
  component: VisualQuestionAnsweringOutput
}

const Template = (args) => <VisualQuestionAnsweringOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestVisualQuestionAnswering};

