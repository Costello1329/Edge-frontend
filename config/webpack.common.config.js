const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const root = path.resolve(__dirname, "../");

const commonRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: "ts-loader",
    options: { configFile: `${root}/tsconfig.json` }
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: "html-loader",
    options: { minimize: true }
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /node_modules/,
    loader: "url-loader",
    options: { outputPath: "assets" }
  },
  {
    test: /\.svg$/,
    exclude: /node_modules/,
    loader: "svg-react-loader",
    options: { outputPath: "assets" }
  },
  {
    test: /\.s(a|c)ss$/,
    exclude: /node_modules/,
    use: [
      { loader: "style-loader" },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      },
      { loader: "resolve-url-loader" },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: { config: "./config/postcss.config.js" }
        }
      },
      {
        loader: 'url-tilde-loader',
        options: { replacement: `${root}/src` }
      },
      "sass-loader"
    ]
  }
];

const commonPlugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new MiniCssExtractPlugin(),
  new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html",
  })
];

function buildWebpackConfig(rules, plugins, development) {
  return {
    mode: development ? "development" : "production",
    entry: "./src/index.tsx",

    output: {
      path: `${root}/../build`,
      publicPath: "",
      // filename: "assets/a[hash:7].js",
      // chunkFilename: "assets/v[id][contenthash:7].js"
    },

    module: {
      rules: rules
    },

    resolve: {
      alias: { '~/': `${root}/src/` },
      modules: ["../src", "../node_modules"],
      extensions: [".scss", ".ts", ".tsx", ".js", ".json"]
    },

    plugins: plugins,

    devServer: {
      contentBase: `${root}/../build`,
      compress: true,
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
      port: 1329,
      host: "localhost",
    }
  };
}

module.exports = {
  commonRules: commonRules,
  commonPlugins: commonPlugins,
  buildWebpackConfig: buildWebpackConfig
}
