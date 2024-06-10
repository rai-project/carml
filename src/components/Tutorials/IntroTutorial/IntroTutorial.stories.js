import React from 'react';
import IntroTutorial from "./IntroTutorial";
import { BrowserRouter } from 'react-router-dom';

export default {
  title: "Tutorials/IntroToMachineLearning",
  component: IntroTutorial,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
}

const Template = (args) => {
  return <IntroTutorial/>
}

export const Default = Template.bind({});
