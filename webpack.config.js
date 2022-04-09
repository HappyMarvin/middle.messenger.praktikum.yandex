const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');


module.exports = {
  mode: 'development',
  entry: './src/pages/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'project-name.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: './src/pages/index.html'
        }),
        new HtmlWebpackPugPlugin()
    ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader']
      },
      {
        test: /\.pug$/,
        use: [{loader: 'pug-loader',
        options: {
          // options to pass to the compiler same as: https://pugjs.org/api/reference.html
          data: {} // set of data to pass to the pug render.
        }}]
      },
    ]
  }
}; 