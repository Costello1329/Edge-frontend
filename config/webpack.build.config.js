const webpack = require("webpack");

const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin =
  require("optimize-css-assets-webpack-plugin");
const path = require('path');
// const LoadablePlugin = require("@loadable/webpack-plugin");

const root = path.resolve(__dirname, "../");

const rules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: "ts-loader",
    options: { configFile: `${root}/config/tsconfig.json` }
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: "html-loader",
    options: { minimize: true }
  },
  {
    // test: /\.woff|\.woff2$/,
    // exclude: /node_modules/,
    // loader: "file-loader",
    // options: { outputPath: "assets" }
    test: /\.woff2?$/,
    use: {
      loader: "url-loader",
      options: {
        // limit: 50000,
        // mimetype: "application/font-woff",
        outputPath: "assets",
        // name: "../src/assets/fonts/Inter/[name].[ext]",
        // publicPath: "../", // Take the directory into account
      }
    }
  },
  {
    test: /\.svg$/,
    exclude: /node_modules/,
    loader: "svg-react-loader",
    options: { outputPath: "assets" }
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          // sourceMap: true
        }
      },
      "resolve-url-loader",
      {
        loader: "postcss-loader",
        options: {
          // sourceMap: true,
          postcssOptions: {
            config: `${root}/config/postcss.config.js`
          }
        }
      },
      {
        loader: 'url-tilde-loader',
        options: { replacement: `${root}/assets` }
      },
      "sass-loader"
    ]
  }
];

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new MiniCssExtractPlugin({
    // filename: "assets/a[hash:7].css",
    // chunkFilename: "assets/v[id][contenthash:6].css"
  }),
  new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html",
    // favicon: "./public/favicon.ico"
  }),
  // new LoadablePlugin({ filename: "stats.json", writeToDisk: true })
];


module.exports = {
  mode: "production",
  entry: "./src/index.tsx",

  output: {
    path: `${root}/build`,
    publicPath: "",
    filename: "assets/a[hash:7].js",
    chunkFilename: "assets/v[id][contenthash:7].js"
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

  optimization: {
    minimizer: [
      // new TerserJSPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
      // new OptimizeCSSAssetsPlugin({})
    ]
  }

  // stats: {
  //   all: true,
  //   children: false,
  //   chunks: false,
  //   modules: false,
  //   maxModules: 0,
  //   errors: true,
  //   warnings: false,
  //   moduleTrace: false,
  //   errorDetails: true
  // }
};
