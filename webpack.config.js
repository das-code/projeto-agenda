const path = require('path')
const fileLoader = require('file-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.resolve('./frontend/assets/js/main.js'),

  output: {
    path: path.resolve('./public/assets/js'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../images',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.css',
    }),
  ],

  devtool: 'source-map',
}
