const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk')
const Markdown = require('marked')
const md5 = require('md5')
const matchAll = require('string.prototype.matchall');

const DATA_JSON = {
  docsList: []
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
        callback(dir.toString())
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

  const publicDocsPath = './public/docs'
  const docsConfigPath = publicDocsPath

  async function readdir(path) {
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
          log(chalk.white.bgGreen.bold('查找文件夹下文件:'));
          await readdir(filePath)
        } else {
          log('\n---------\n');

          if ((/.md$/).exec(file)) {
            const pathMD = [
              '__',
              filePath.replace(/^(\.\/src\/)|[\s*]/g, '').replace(/(\/)/g, '_').replace(/\.md$/g, '.json')
            ].join('')

            const html = await readFileSync(filePath)
            if (!html) return false;
            const __html = MD5MarkdownID(Markdown(html))
            const key = md5(pathMD)

            DATA_JSON.docsList.push({
              path: key,
              pathName: pathMD,
              fileName: file.replace(/\.md$/g, ''),
              toc: doctocRegExp(__html)
            })

            const isfile = fs.existsSync(docsConfigPath)
            if (!isfile) {
              await mkdir(docsConfigPath)
            }
            await writeFile(`${docsConfigPath}/__data.json`, JSON.stringify(DATA_JSON.docsList), false)
            
            // await fse.remove(publicDocsPath)

           /*  const isfile2 = fs.existsSync(publicDocsPath)
            if (!isfile2) {
              await mkdir(publicDocsPath)
            } */
            await writeFile(`${publicDocsPath}/${key}.json`, JSON.stringify({  __html, key, fileName: pathMD }), false)
          }
        }
      });
  }
  readdir('./src/docs')

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