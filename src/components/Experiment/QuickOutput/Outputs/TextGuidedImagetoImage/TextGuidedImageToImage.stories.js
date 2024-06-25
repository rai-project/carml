import React from 'react';
import { TestTextGuidedImageToImage } from './testData/testTextGuidedImageToImageOutput'
import { TextGuidedImageToImageOutput } from './TextGuidedImageToImageOutput'

export default {
  title: "Experiments/Quick Output/Text Guided Image to Image",
  component: TextGuidedImageToImageOutput
}

const Template = (args) => <TextGuidedImageToImageOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestTextGuidedImageToImage};

