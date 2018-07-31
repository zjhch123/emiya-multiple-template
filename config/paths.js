'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src')

const appViews = path.resolve(appSrc, 'view')
const appJS = glob.sync(path.resolve(appSrc, 'js', '**', '*.js'))
const appLib = glob.sync(path.resolve(appSrc, 'js', 'lib', '*.js'))

const appPages = (() => {
  const p = []
  appJS.forEach(js => {
    if (appLib.indexOf(js) === -1) {
      p.push(js)
    }
  })
  return p
})()

module.exports = {
  appSrc: appSrc,
  appROOT: resolveApp(''),
  appNodeModules: resolveApp('node_modules'),
  appBuildPath: resolveApp('build'),
  appLib: path.resolve(appSrc, 'js', 'lib'),
  appCSS: path.resolve(appSrc, 'css'),
  appPages: appPages,
  appViews: appViews
};
