import React from 'react';

import PageNavigation from "../components/Paginator/PageNavigation";

export default {
  title: 'Navigation/Page Navigation',
  component: PageNavigation,
};

const Template = (args) => <PageNavigation {...args} />;

export const Page1Of2 = Template.bind({});
Page1Of2.args = {
  key: 'one-of-two',
  pageCount: 2,
  selectedPage: 1
}

export const Page3Of10 = Template.bind({});
Page3Of10.args = {
  key: 'many-pages',
  pageCount: 10,
  selectedPage: 3
}

export const Page5Of10 = Template.bind({});
Page5Of10.args = {
  key: 'many-pages',
  pageCount: 10,
  selectedPage:5
}

export const Page8Of10 = Template.bind({});
Page8Of10.args = {
  key: 'many-pages',
  pageCount: 10,
  selectedPage: 8
}
