const commonWebpackConfig = require("./webpack.common.config.js");


const devRules = [];

const devPlugins = []

module.exports = commonWebpackConfig.buildWebpackConfig(
  commonWebpackConfig.commonRules.concat(devRules),
  commonWebpackConfig.commonPlugins.concat(devPlugins),
  true
);
