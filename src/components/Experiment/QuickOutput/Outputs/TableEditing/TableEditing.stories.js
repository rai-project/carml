import React from 'react';
import TableEditingOutput from "./TableEditingOutput";
import { TestTableEditingOutput } from './testData/testTableEditingOutput';

export default {
  title: "Experiments/Quick Output/Table Editing",
  component: TableEditingOutput
}

const Template = (args) => <TableEditingOutput {...args}/>

export const Default = Template.bind({});

Default.args = {trial: TestTableEditingOutput};

