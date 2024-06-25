import React from 'react';
import ImageTo3DOutput from "./ImageTo3DOutput";
import { TestImageTo3DOutput } from './testData/testImageTo3DOutput';

export default {
  title: "Experiments/Quick Output/Image to 3D",
  component: ImageTo3DOutput
}

const Template = (args) => <ImageTo3DOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestImageTo3DOutput};

