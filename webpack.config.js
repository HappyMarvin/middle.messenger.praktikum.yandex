const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/pages/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "../"
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: './src/pages/index.html'
        }),
        new CleanWebpackPlugin()
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