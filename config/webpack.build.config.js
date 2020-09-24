const commonWebpackConfig = require("./webpack.common.config.js");


const buildRules = [];

const buildPlugins = []

module.exports = commonWebpackConfig.buildWebpackConfig(
  commonWebpackConfig.commonRules.concat(buildRules),
  commonWebpackConfig.commonPlugins.concat(buildPlugins),
  false
);
