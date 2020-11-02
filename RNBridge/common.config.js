'use strict';

const fs = require('fs');
const pathSep = require('path').sep;
const md5 = require('js-md5');
const isEncrypt = true

function manifest(path) {
  if (path.length) {
    const manifestFile = `./dist/common_manifest_ios.txt`;
    if (!fs.existsSync(manifestFile)) {
      fs.writeFileSync(manifestFile, path);
    } else {
      fs.appendFileSync(manifestFile, '\n' + path);
    }
  }
}

function processModuleFilter(module) {
  if (module.path.indexOf('__prelude__') >= 0) {
    return false;
  }
  manifest(module.path);
  return true;
}

function createModuleIdFactory() {
  //获取命令行执行的目录，__dirname是nodejs提供的变量
  const projectRootPath = __dirname;
  return (path) => {
    let name = '';
    // 如果需要去除react-native/Libraries路径去除可以放开下面代码
    // if (path.indexOf('node_modules' + pathSep + 'react-native' + pathSep + 'Libraries' + pathSep) > 0) {
    //   //这里是react native 自带的库，因其一般不会改变路径，所以可直接截取最后的文件名称
    //   name = path.substr(path.lastIndexOf(pathSep) + 1);
    // }
    if (path.indexOf(projectRootPath) == 0) {
      /*
        这里是react native 自带库以外的其他库，因是绝对路径，带有设备信息，
        为了避免重复名称,可以保留node_modules直至结尾
        如/{User}/{username}/{userdir}/node_modules/xxx.js 需要将设备信息截掉
      */
      name = path.substr(projectRootPath.length + 1);
    }
    //js png字符串 文件的后缀名可以去掉
    name = name.replace('.js', '');
    // name = name.replace('.png', '');
    // 最后在将斜杠替换为下划线
    let regExp = pathSep == '\\' ? new RegExp('\\\\', "gm") : new RegExp(pathSep, "gm");
    name = name.replace(regExp, '_');
    // 名称加密
    if (isEncrypt) {
      name = md5(name)
    }
    return name;
  };
}

module.exports = {
  serializer: {
    createModuleIdFactory,
    processModuleFilter,
  },
};
