import React from 'react';
import StyleTransfer from "./StyleTransfer";
import {TestImageEnhancementData, TestImageEnhancementData2} from "./testData/TestFeatures";

export default {
  title: "Experiments/Quick Output/Style Transfer",
  component: StyleTransfer
}

const Template = (args) => <StyleTransfer {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestImageEnhancementData};

// export const Vertical = Template.bind({});
// Vertical.args = {trial: TestImageEnhancementData2};
