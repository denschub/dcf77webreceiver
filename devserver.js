var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  historyApiFallback: true,
  hot: true,
  publicPath: config.output.publicPath
}).listen(3000, "localhost", function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Listening at localhost:3000");
});
