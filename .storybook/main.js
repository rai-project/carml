// const custom = require('../webpack.config.js');
const custom = require("../config/webpack.config.js");
module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-create-react-app"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true
  }
};