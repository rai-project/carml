import React from 'react';
import { TestTextGuidedImagetoImage } from './testData/testTextGuidedImagetoImageOutput'
import TextGuidedImagetoImageOutput from './TextGuidedImagetoImageOutput';
export default {
  title: "Experiments/Quick Output/Text Guided Image to Image",
  component: TextGuidedImagetoImageOutput
}

const Template = (args) => <TextGuidedImagetoImageOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestTextGuidedImagetoImage};

