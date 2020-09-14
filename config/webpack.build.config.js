const commonWebpackConfig = require("./webpack.common.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const buildRules = [
  {
    test: /\.(sa|sc)ss$/,
    use: [
      "style-loader",
      {
        loader: MiniCssExtractPlugin.loader
      },
      "css-loader",
      "resolve-url-loader",
      "sass-loader"
    ]
  }
];

module.exports = commonWebpackConfig.buildWebpackConfig(
  commonWebpackConfig.commonRules.concat(buildRules),
  commonWebpackConfig.commonPlugins,
  false
);
