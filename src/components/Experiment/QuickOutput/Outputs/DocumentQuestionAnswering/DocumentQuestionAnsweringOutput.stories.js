import React from 'react';
import { TestDocumentQuestionAnswering } from './testData/testDocumentQuestionAnsweringOuput'
import DocumentQuestionAnsweringOutput from './DocumentQuestionAnsweringOutput';
export default {
  title: "Experiments/Quick Output/Document Question Answering",
  component: DocumentQuestionAnsweringOutput
}

const Template = (args) => <DocumentQuestionAnsweringOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestDocumentQuestionAnswering};

