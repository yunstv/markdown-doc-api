const path = require('path')
const fs = require('fs-extra')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function copyPublicFolder () {
  fs.copySync(resolveApp('public'), resolveApp('build'), {
    dereference: true,
    filter: (file) => file !== resolveApp('public/index.html'),
  })
}

copyPublicFolder()