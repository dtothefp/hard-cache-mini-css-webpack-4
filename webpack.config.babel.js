import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const {NODE_ENV} = process.env;
const dest = `dist`;
const base = path.join.bind(path, process.cwd());

export default {
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: base(dest),
  },
  devtool: 'source-map',
  cache: true,
  optimization: {
    minimize: false,
  },
  mode: 'development',
  devServer: {
    contentBase: base(dest),
    host: 'localhost',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin([dest]),
    new HtmlWebPackPlugin({
      template: base('src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin({
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', 'yarn.lock'],
      },
    }),
  ],
}
