const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')

function mkdirSync(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      let tmpPath = null;
      dirPath.split(/[/\\]/).forEach(function (dirname) {
        if (dirname === '') {
          return false
        }
        if (tmpPath) {
          tmpPath = path.join(tmpPath, dirname);
        } else {
          tmpPath = path.resolve('/', dirname);
        }
        if (!fs.existsSync(tmpPath)) {
          if (!fs.mkdirSync(tmpPath)) {
            return false;
          }
        }
      });
    }
    return true;
  } catch (e) {
    console.error("create director fail! path=" + dirPath + " errorMsg:" + e);
    return false;
  }
}

function main() {
  const appSrc = paths.appSrc
  const newPagePath = process.argv[2]

  if (newPagePath === undefined) {
    console.log('请输入页面路径, 例如: /user/info/index.html')
    return
  }
  if (!newPagePath.endsWith('.html')) {
    console.log('请输入标准的页面路径, 例如: /user/info/index.html')
    return
  }
  
  const pathName = path.dirname(newPagePath)
  const pageName = newPagePath.split('.html')[0]

  mkdirSync(path.join(appSrc, 'css', pathName))
  mkdirSync(path.join(appSrc, 'js', pathName))
  mkdirSync(path.join(appSrc, 'view', pathName))

  const newCSSPath = path.join(appSrc, 'css', pageName + '.scss')
  const newJSPath = path.join(appSrc, 'js', pageName + '.js')
  const newViewPath = path.join(appSrc, 'view', pageName + '.html')
  try {
    fs.writeFileSync(newViewPath, `<!doctype html><html></html>`)
    fs.writeFileSync(newJSPath, `import '@css${pageName}.scss'\nconsole.log('hello world')`)
    fs.writeFileSync(newCSSPath, `html { margin: 0 }`)
    console.log(newCSSPath, '   create success!')
    console.log(newJSPath, '   create success!')
    console.log(newViewPath, '   create success!')
  } catch (e) {
    console.log('error!', e)
  }
}

main()