const webpack = require("webpack");
const commonWebpackConfig = require("./webpack.common.config.js");


const devRules = [
  {
    test: /\.(sa|sc)ss$/,
    use: [
      "style-loader",
      "css-loader",
      "resolve-url-loader",
      "sass-loader"
    ]
  }
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

module.exports = commonWebpackConfig.buildWebpackConfig(
  commonWebpackConfig.commonRules.concat(devRules),
  commonWebpackConfig.commonPlugins.concat(devPlugins),
  true
);
