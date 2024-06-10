const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
  disableEsLint,
  addWebpackAlias,
  addTslintLoader,
} = require("customize-cra");
const path = require("path");

function resolve(...dir) {
  return path.join(__dirname, ...dir);
}

function resolveSrc(...dir) {
  return path.join(__dirname, "src", ...dir);
}

function rewireSVGR(svgrLoaderOptions) {
  return function (config) {
    const svgReactLoader = {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve(`@svgr/webpack`),
          options: svgrLoaderOptions,
        },
        {
          loader: "url-loader",
        },
      ],
    };
    config.module.rules.unshift(svgReactLoader);
    return config;
  };
}

const primaryColor = "#19263a";

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  fixBabelImports("lodash", {
    libraryName: "lodash",
    libraryDirectory: "",
    camel2DashComponentName: false, // default: true
  }),
  addWebpackAlias({
    ["@"]: resolve("src"),
    ["@components"]: resolveSrc("components"),
    ["@context"]: resolveSrc("context"),
    ["@routes"]: resolveSrc("routes"),
    ["@resources"]: resolveSrc("resources"),
    ["@icons"]: resolveSrc("resources", "icons"),
    ["@helpers"]: resolveSrc("helpers"),
    ["@common"]: resolveSrc("common"),
  }),
  addTslintLoader()
);
