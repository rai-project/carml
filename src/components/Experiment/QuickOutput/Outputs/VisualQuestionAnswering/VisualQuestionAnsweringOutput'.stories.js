import React from 'react';
import { TestVisualQuestionAnswering } from './testData/testVisualQuestionAnsweringOutput';
import VisualQuestionAnsweringOutput from './VisualQuestionAnsweringOutput';
import QuickOutput from '../../QuickOutput';
export default {
  title: "Experiments/Quick Output/Visual Question Answering",
  component: VisualQuestionAnsweringOutput
};

const Template = (args) => <QuickOutput {...args} />;

export const Default = Template.bind({});

Default.args = { trialOutput: TestVisualQuestionAnswering, hideHeader: true, };

