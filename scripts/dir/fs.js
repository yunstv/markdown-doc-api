const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk')
const Markdown = require('marked')
const md5 = require('md5')
const matchAll = require('string.prototype.matchall');
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const docsConfigPath = resolveApp('./docs.config.js')
const docsListConfig = require(docsConfigPath)
let docType = ''
function tocDir(strArr, DATA_JSON) {
  var strArr2 = strArr.map((value) => value.split('/'))
	var newArr = []

  var forEachFunc = (arr, newArr) => {
		arr.forEach((arrItem) => {
		   var isArr = Array.isArray(arrItem)	
		   var pathName = isArr ? arrItem.shift() : arrItem
		   var index = newArr.findIndex((item) => item.pathName === pathName)
		   if (index === -1) {
        var pathName_ = pathName.split('|')
        var key = pathName_[1] || md5(pathName_[0])
        let item = {
          pathName: pathName_[0],
          path: key,
          docType,
          children: [],
          domian: process.env.PUBLIC_URL || '--'
        }
        if (key && DATA_JSON.docsToc[key] ) {
          item = {
            ...item,
            ...DATA_JSON.docsToc[key]
          }
        }
        newArr.push(item)
        var length = newArr.length
        return isArr && arrItem.length && forEachFunc([arrItem], newArr[length - 1].children)
		   }
		   return isArr && arrItem.length && forEachFunc([arrItem], newArr[index].children)
		})
		return newArr
	}
  return forEachFunc(strArr2, newArr)
}

/**
 * 查找h标签id，加密
 * 解决中文id在浏览器无法定位问题
 * 获取字符集指定字符
 * `<h3 id="{md5(id)}" ></h3>`
 * @param {string} str 
 */
const MD5MarkdownID = (str) => {
  const reg = new RegExp(/\<h.{2}id=("\S*")?\s*>\s*?[\S|\s]*?\s*<\/h\w>/g)
  return str.replace(reg, (...arg) => {
    return arg[0].replace(arg[1], `"${md5(arg[1] + Date.now())}"`)
  })
}
/**
 * 解析目录
 * 获取字符集指定字符
 * `<h3 id="{id}" >{value}</h3>`
 * @param {string} str 
 */
const doctocRegExp = (str) => {
  const tocArr = []
  // var str = `<h3 id="styling" >  Styling  </h3><h3 id="styling2">Sty li ng2</h3><h3 id="styling3"> S  t y-l-i ng3 </h3>`
  const reg = new RegExp(/\<h.{2}id=("\S*")?\s*>(\s*?[\S|\s]*?\s*)<\/h\w>/g)
  const findToc = [...matchAll(str, reg)].map((item) => ({
    id: item[1].replace(/"/g, ''),
    value: item[2],
    index: item.index
  }))
  return findToc
}

async function directory(path, isLog = true) {
  const log = isLog ? console.log : () => {}
  async function readFileSync(path) {
    const dir = await fs.readFileSync(path);
    log('读取文件:\n', path);
    log(dir.toString());
    return new Promise((callback) => {
      fs.stat(path, function(err, stats) {
        if (err) return console.error(err);
        log(
          chalk.blue('获取文件信息:'),
          chalk.green(
            '\n是否为文件:' +
            chalk.blue.underline.bold(stats.isFile() ? '是' : '否')
          ),
          chalk.green(
            '\n是否为目录:' +
            chalk.blue.underline.bold(stats.isDirectory() ? '是' : '否')
          )
        );
        callback({ birthtimeMs: stats.birthtimeMs, mtimeMs: stats.mtimeMs, html: dir.toString()})
      })
    })
  }
  // await readFileSync(path)

  async function mkdir(path) {
    log('\n---------\n创建目录:\n');
    return new Promise((callback) => {
      // 创建目录
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) return console.error(err);
        log('目录创建成功：', path);
        callback()
      });
    })

  }

  // await mkdir('./tmpApp')

  function readdirFunc(pathFile, pathItem = {}) {
    const DATA_JSON = {
      docsList: [],
      docsToc: {},
      docsArray: []
    }
    // 定义编译文件名称
    // 内部文档文件夹
    const innerDoc = 'inner-doc'
    // 对外文档文件夹
    const foreignDoc = 'foreign-doc'
    // open文档文件夹
    const openDoc = 'open-doc'
    let isInner = false
    let isopen = false
    let docType = pathItem.docType

    switch (pathFile) {
      case './src/docs':
        // docType = pathItem
        break;
      case './src/inner-docs':
        // docType = innerDoc
        isInner = true
        break;
      case './src/open-docs':
        // docType = openDoc
        isopen = true
        break;
      default:
        break;
    }
    const publicDocsPath = `./public/docs/${docType}`
    const docsConfigPath = publicDocsPath
    let time
    let fileIndex = -1
    async function readdir(path, fileIndex) {
      log('\n---------\n读取目录:\n');
        const files = fs.readdirSync(path, { recursive: true })
        files.forEach(async function (file, index){
          let filePath = `${path}/${file}`
          const statfile = fs.statSync(filePath)
          const isDir = statfile.isDirectory()
          log(
            chalk.blue('获取文件信息:'),
            chalk.green(
              '\n 文件:' +
              chalk.blue.underline.bold(file) +
              '\n 长路径:' + filePath
            ),
            chalk.green(
              '\n 类型:' +
              chalk.blue.underline.bold(isDir ? '文件夹' : '文件')
            )
          );
          // log('是否为文件：', statfile.isFile());
          // log('是否为目录：', statfile.isDirectory());
          if (isDir) {
            // console.log(chalk.white.bgGreen.bold('查找文件夹下文件:'));
            await readdir(filePath, index)
          } else {
            // console/log('\n---------\n');

            if ((/.md$/).exec(file)) {
              const pathMD = [
                '__',
                filePath.replace(/^(\.\/src\/)|[\s*]/g, '').replace(/(\/)/g, '_').replace(/\.md$/g, '.json')
              ].join('')

              const { birthtimeMs, mtimeMs, html } = await readFileSync(filePath)
              if (!html) return false;
              const __html = MD5MarkdownID(Markdown(html))
              const key = md5(pathMD)
              
              // DATA_JSON.docsList.push({
              //   path: key,
              //   pathName: pathMD,
              //   fileName: file.replace(/\.md$/g, ''),
              //   // toc: doctocRegExp(__html)
              // })
              // 新增需求
              // 区分文档环境
              // 对内文档与对内文档 通过文件夹区分
              let docsKey = filePath.replace(/^(\.\/src\/docs\/)|(\.md)$/g, '')
              if (isInner) {
                docsKey = filePath.replace(/^(\.\/src\/inner-docs\/)|(\.md)$/g, '')
              }
              if (isopen) {
                docsKey = filePath.replace(/^(\.\/src\/open-docs\/)|(\.md)$/g, '')
              }
              DATA_JSON.docsToc[key] = {
                mtimeMs,
                birthtimeMs,
                pathName: pathMD,
                docType,
                fileName: file.replace(/\.md$/g, ''),
                // toc: doctocRegExp(__html)
              }
              DATA_JSON.docsArray.push(`${docsKey}|${key}`)
              const isfile = fs.existsSync(docsConfigPath)
              if (!isfile) {
                await mkdir(docsConfigPath)
              }
              time && clearTimeout(time)
              time = setTimeout(() => {
                const multidimensionalArray = tocDir(DATA_JSON.docsArray, DATA_JSON)
                writeFile(`${docsConfigPath}/data.txt`, JSON.stringify(multidimensionalArray), false)
              }, 500);
              await writeFile(`${publicDocsPath}/${key}.txt`, JSON.stringify({ __html, key, docType, fileName: pathMD, mtimeMs, birthtimeMs }), false)
            }
          }
        });
    }
    readdir(pathFile)
  }
  async function readdirSrc(path) {
    const files = fs.readdirSync(path, { recursive: true })
    // etc对外文档文件编译
    // readdirFunc('./src/docs')
    // // 对内文档文件编译
    // readdirFunc('./src/inner-docs')
    // // open-doc文件编译
    // readdirFunc('./src/open-docs')
    const docsList = files.filter((type) => type.indexOf('docs') > -1)
    const docsListData = []
    const docsListConfigFunc = (file) => {
      const fileItem = docsListConfig[file]
      if (!fileItem) return;
      docType = fileItem.docType
      fileItem.path = ''
      docsListData.push(fileItem)
    }
    docsList.forEach((file) => {
      const filePath = `${path}/${file}`
      const statfile = fs.statSync(filePath)
      const isDir = statfile.isDirectory()
      isDir && docsListConfigFunc(file)
      isDir && readdirFunc(filePath,  docsListConfig[file])
    })
    writeFile(`./public/docs-data.txt`, JSON.stringify(docsListData), false)
  }
  readdirSrc('./src')

  async function writeFile(path, content) {
    isLog && log('\n---------\n写入文件操作:\n');
    return new Promise((callback) => {
      fs.writeFile(path, content, function(err) {
        if (err) console.error(err);
        if (isLog) {
          log('写入文件成功!');
          readFileSync(path)
        }
        callback()
      })
    })
  }

  // await writeFile('./tmpApp/__input.txt', 'add file content .txt tmp')
  // await writeFile('./tmpApp/__input.json', JSON.stringify({ data: [ { key: 'king', value: '牛奶涨涨涨' } ] }))
}

directory('package.json', false).catch(console.error);