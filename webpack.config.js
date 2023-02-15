const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');


module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
  devtool: 'inline-source-map',
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
          use: [MiniCssExtractPlugin.loader,{
          loader: "css-loader",
          options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ['*/**/*.html']
  }
}