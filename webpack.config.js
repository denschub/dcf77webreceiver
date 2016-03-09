const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  context: __dirname + "/src",
  devtool: "source-map",
  entry: {
    javascript: "./app.js",
    html: "./index.html"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel?presets[]=react,presets[]=es2015"
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          ["css-loader", "sass-loader"].join("!")
        )
      }
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new ExtractTextPlugin("app.css")
  ]
};

if (process.argv.indexOf("--optimize-minimize") !== -1) {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = config;
