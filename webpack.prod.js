const { resolve } = require("path");
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/textures",
          to: "textures",
        },
        {
          from: "public/models",
          to: "models",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
  output: {
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].js",
    assetModuleFilename: "assets/[hash][ext]",
    path: resolve(__dirname, "./dist"),
    clean: true,
  },
});
