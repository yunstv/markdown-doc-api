import docsConfig from '../../../docs.config'
// 缓存操作
const docDataCache = {}
/**
 * 获取json文档
 * inner 对内文档
 * foreign 对外文档
 * open open文档
 * @param {*} callback 
 * @returns 
 */
const docsConfigKey = Object.keys(docsConfig).map((key) => ({ key: key, route: docsConfig[key].route }))
const getPathFunc = (path, _path) => { 
  const findKey = docsConfigKey.find(item => path.includes(item.route))
  const findItem = findKey ? docsConfig[findKey.key] : docsConfig['docs']
  // let docsDataSource = 'foreign-doc';
  // if (path.includes('/inner')) {
  //   docsDataSource = 'inner-doc'
  // } else if (path.includes('/open')) {
  //   docsDataSource = 'open-doc'
  // } else {
  //   docsDataSource = 'foreign-doc'
  // }
  return `docs/${findItem.docType}/${_path}.txt`
}
export const docFetchDataFunc = ({ path, _path = 'data', docsFetchKeyDefault }, callback) => {
  const docsFetchKey = docsFetchKeyDefault || getPathFunc(path, _path)
  if (docDataCache[docsFetchKey]) {
    return callback(docDataCache[docsFetchKey])
  }
  fetch(docsFetchKey)
    .then((response) => response.json())
    .then((res) => {
      callback(res)
      docDataCache[docsFetchKey] = res
    })
}

const countFunc = (str) => {
  let value = (str['fileName'] || str['pathName']).split('-')
  let count = Number(value[0])
  return Number.isNaN(count) ? 999 : count
}
/**
 * 菜单排序
 * [01-x, 03-x, 02-x, x] => [01-x, 02-x, 03-x, x]
 * @param { Array } sourceData 
 * @returns 
 */
export const sortDocDataMenuFunc = (sourceData) => {
  let sourceDataCP = [].concat(sourceData)
  let sortArr = sourceDataCP.sort((prevValue, value) => {
   /*  if (callback && Array.isArray(value.children) && value.children.length > 0) {
      // value.children = sortDocDataMenuFunc(value.children, 'fileName')
      callback(value)
    } */
    let countValue = countFunc(value)
    let countPrevValue = countFunc(prevValue)
    return countPrevValue - countValue
  })
  return sortArr

}

/**
 * 判断值为数组，且长度大于0
 * @param {array} data 
 * @returns 
 */
export const isArrFunc = (data) => Array.isArray(data) && !!data.length

/**
 * 递归设定active值
 * [[[]], [[]], ...]
 * @param {*} data 
 * @returns 
 */
const fpShift = (data) => {
  const item = [...data].shift() || []
  item.active = true
  if (isArrFunc(item.children)) return fpShift(item.children)
  return item
}

/**
 * 递归查找多维数组中path对应项
 * [[[]], [[]], ...]
 * @param {*} data 
 * @param {string} path 
 * @returns 
 */
export const fpFind = (data, path) => {
  const isVerify = (item) => {
    if (item.path === path) return true
    else if (isArrFunc(item.children)) return fpFind(item.children, path)
    else return false
  }
  if (!Array.isArray(data) && typeof data === 'object') {
    return isVerify(data) ? data : false
  }
  return data.find((item) => isVerify(item))
}

export const findPathItem = (data, path, callback) => {
  return data.find((item) => {
    if (item.path === path) {
      item.active = true
      callback(item)
      return true
    } else if (isArrFunc(item.children)) {
      const findvalue = findPathItem(item.children, path, callback)
      return !!findvalue
    } else {
      return false
    }
  })
}

export const findPath = (data, pathItem, callback) => {
  if (!pathItem.path) {
    findPathItem(data, pathItem.sourcePath, (findPathItem) => {
      findPath(data, { ...findPathItem, ...pathItem}, callback)
    })
    return false;
  }
  const value = fpFind(pathItem, pathItem.sourcePath)
  
  if (!value) return;
  if (value.children && value.children.length ) {
    callback && callback(fpShift(value.children))
  } else {
    callback && callback(value)
  }
}
