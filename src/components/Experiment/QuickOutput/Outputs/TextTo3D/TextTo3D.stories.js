import React from 'react';
import TextTo3DOutput from './TextTo3DOutput';
import { TestTextTo3DOutput } from './testData/testTextTo3DOutput';

export default {
  title: "Experiments/Quick Output/Text to 3D",
  component: TextTo3DOutput
}

const Template = (args) => <TextTo3DOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestTextTo3DOutput};

