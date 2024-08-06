import React from 'react';
import MaskGenerationOutput from "./MaskGenerationOutput";
import { TestMaskGenerationOutput } from './testData/testMaskGenerationOutput';

export default {
  title: "Experiments/Quick Output/Mask Generation",
  component: MaskGenerationOutput
}

const Template = (args) => <MaskGenerationOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestMaskGenerationOutput};
