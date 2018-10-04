import React from 'react';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import express from 'express';
import path from 'path';
import config from './webpack.config.babel';
import App from './src/MainComponent';

const html = async (webpackStats) => {
  const modules = [];

  await Loadable.preloadAll()

  const body = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App/>
    </Loadable.Capture>
  );

  const stats = require('./dist/react-loadable.json');
  let bundles = getBundles(stats, modules).filter(b => !!b);

  console.log('*********', modules);

  if (!bundles.length) {
    Object.keys(stats).reduce();
  }

  console.log(bundles)
  // console.log('*****', webpackStats)

  return `<html>
    <head>
      <link rel="stylesheet" href="">
      <link rel="stylesheet" href="">
      <link rel="stylesheet" href="">
    </head>
    <body>
      ${body}
      <script src=""></script>
    </body>
  </html>`;
};

const renderMiddleware = async (req, res, next) => {
  if (req.url === `/`) {
    try {
      const page = await html(res.locals.webpackStats.toJson().assetsByChunkName);

      return res.status(200).send(page);
    } catch (err) {
      next(err);
    }
  }

  next();
};

const {devServer: serverOptions} = config;

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin()
);

const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
  ...serverOptions,
  writeToDisk: true,
});
const hotMiddleware = webpackHotMiddleware(compiler);

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(renderMiddleware);

express.static('./dist');

devMiddleware.waitUntilValid(() => {
  app.listen(serverOptions.port, serverOptions.host, (err) => {
    if (err) throw err;

    console.log(`==> 🔥  Webpack development server listening on port`, serverOptions.port);
  });
});
