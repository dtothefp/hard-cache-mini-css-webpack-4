import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { ReactLoadablePlugin } from 'react-loadable/webpack';

const {NODE_ENV} = process.env;
const dest = `dist`;
const base = path.join.bind(path, process.cwd());
const babelrc = {
  presets: [
    'env',
    'react'
  ],
  plugins: [
    'react-hot-loader/babel',
    'react-loadable/babel',
    'syntax-dynamic-import',
    'transform-object-rest-spread'
  ]
};

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
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false
      }
    }
  },
  mode: 'development',
  devServer: {
    serverSideRender: true,
    contentBase: base(dest),
    host: 'localhost',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            ...babelrc,
            babelrc: false,
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|ComponentA|ComponentB)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /(ComponentA|ComponentB).*\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new HardSourceWebpackPlugin({
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', 'yarn.lock'],
      },
    }),
    new CleanWebpackPlugin([dest]),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: false,
}
