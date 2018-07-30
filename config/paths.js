'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src')

module.exports = {
  appSrc: appSrc,
  appROOT: resolveApp(''),
  appNodeModules: resolveApp('node_modules'),
  appBuildPath: resolveApp('build'),
  appPages: glob.sync(path.resolve(appSrc, '**', 'App.js'))
};
