var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin([{from: 'public' }], {ignore: ['public/index.html']});
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: "index.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: "babel-loader"},
      {test: /\.css$/, loaders: ['style', 'css'], include: path.join(__dirname, 'src')}
    ]
  },
  plugins: [HTMLWebpackPluginConfig, CopyWebpackPluginConfig]
};
