import React from 'react';
import StyleTransfer from "./StyleTransferOutput";
import { TestStyleTransferOutput } from './testData/testStyleTransferOutput';

export default {
  title: "Experiments/Quick Output/Style Transfer",
  component: StyleTransfer
}

const Template = (args) => <StyleTransfer {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestStyleTransferOutput};

