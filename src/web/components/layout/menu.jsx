import React from 'react'
// import Toc from 'comp/markdown/toc'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  docFetchDataFunc,
  sortDocDataMenuFunc,
  isArrFunc,
  findPath
} from 'root/utils/util'

const TocMenu = (props) => {
  const data = props.data
  let history = useHistory();
  const params = useParams();
  const [active, setActive] = React.useState(props.active || -1)
  const handleTocClick = (item, key, index) => {
    setActive(() => {
      const sourcePath = key
      if (sourcePath !== params.path) {
        findPath(props.docsDataSource, {sourcePath, ...item}, (findItem, index) => {
          // console.log('sourcePath:', sourcePath);
          // console.log(findItem);
          let path = `/api/${findItem.path}`
          if (findItem) {
            switch (findItem.docType) {
              case 'inner-doc':
                path = `/inner/${findItem.path}`
                break;
              case 'open-doc':
                path = `/open/${findItem.path}`
                break;
              default:
                break;
            }
            
            history.replace(path)
            // props.setDocsDataFunc(findItem.path, findItem)
          }
        })
      }
      return active === key ? -1 : key
    })
  }
  return (
    <ul className="docs-toc-wrapper">
      {
        data.map((item, key) => {
          const isdir = item.children.find((item) => item.fileName)
          return (
            <li key={key + ''}
              className={`sidebar-item ${item.active ? 'sidebar-item--open' : ''}`}
            >
              {
                // props.children && props.children(item)
                (Array.isArray(item.children) && item.children.length)
                  ? (
                    <>
                      <i onClick={() => handleTocClick(item, item.path, key)  }
                        className={`sidebar-item__toggle icon-chevron-right`}
                      />
                      <p onClick={() => handleTocClick(item, item.path, key) }
                        className="sidebar-item__title"
                      >
                        {item.fileName || item.pathName}
                      </p>
                      {
                        isdir ? (
                          <div className="sidebar-item__anchors"
                            style={{
                              paddingLeft: '10px',
                              paddingTop: 0
                            }}
                          >
                            <TocMenu
                              docsDataSource={props.docsDataSource}
                              data={item.children}
                              active={props.active}
                              setDocsDataFunc={props.setDocsDataFunc}
                            />
                          </div>
                        ) : (
                          <TocMenu
                            docsDataSource={props.docsDataSource}
                            data={item.children}
                            active={props.active}
                            setDocsDataFunc={props.setDocsDataFunc}
                          />
                        )
                      }
                    </>
                  )
                  : (
                    <div className="docs-toc-wrapper">
                      <p onClick={() => handleTocClick(item, item.path) }
                        className={`sidebar-item__title p ${item.active ? 'active' : '1'}`}
                      >
                        {item.fileName}
                      </p>
                    </div>
                  )
              }
            </li>
          )
        })
      }
    </ul>
  )
}

const indexFunc = (data, oldIndex, oldItem = {}) => {
  return data.map((item, index) => {
    var i = (oldItem.index || oldIndex)
    item.index = `${typeof i !== 'undefined' ? i + '-' : ''}${index}`
    if (isArrFunc(item.children)) {
      item.children = indexFunc(item.children, index, item)
    }
    return item
  })
}

const activeFunc = (data, activeIndex) => {
  const newData = data.map((item, index) => {
    item.active = false
    if (isArrFunc(item.children)) {
      item.children = activeFunc(item.children, activeIndex)
    }
    return item
  })
  return newData
}

let time
const MenuComponent = (props) => {
  const params = useParams();
  const docsDataSource = props.docsDataSource;
  const [active, setActive] = React.useState(params.path || -1)
  const [title, setTitle] = React.useState('')
  const [docsData, setDocsData] = React.useState(indexFunc(docsDataSource))
  const setDocsDataFunc = React.useCallback((path, item) => {
    setActive(path)
    findPath(docsData, {sourcePath: path, ...item}, (findItem, findIndex) => {
      if (!findItem) return false;
      setDocsData((docsData) => {     
        const split = findItem.index.split('-')
        const [parentIndex, index] = split
        const splitFunc = (index, arrIndex, value) => {
          if (arrIndex.length > index) {
            const i = arrIndex[index]
            value = value.map((item, index) => {
              item.active = +i === index
              return item
            })
            if (isArrFunc(value[i].children)) {
              splitFunc(index + 1, arrIndex, value[i].children)
            } else {
              setTitle('-' + (value[i].fileName || value[i].pathName))
            }
          }
        }
        const newDocsData = [].concat(docsData).map((item) => {
          const recursion = (item) => {
            if (isArrFunc(item)) {
              item = item.map((item) => {
                recursion(item)
                return item
              })
            } else {
              item.active = false
              if (isArrFunc(item.children)) {
                item.children = recursion(item.children)
              }
            }
            return item
          }
          return recursion(item)
        })
        splitFunc(0, split, newDocsData)
        // handleTocClick(findItem)
        return newDocsData
      })
    })
  }, [params.path])
  React.useLayoutEffect(() => {
    setDocsDataFunc(params.path)
    return () => {
      time && clearTimeout(time)
    }
  }, [props])
  return (
    <div style={{
      width: '293px'
    }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`接口文档${title || ''}`}</title>
        <link rel='canonical' href='' />
      </Helmet>
      <TocMenu
        docsDataSource={docsDataSource}
        data={docsData}
        active={active}
        setDocsDataFunc={setDocsDataFunc}
      />
    </div>
  )
}

const MenuComponentHoc = (props) => {
  const match = useRouteMatch()
  const [docsDataSource, setDocsDataSource] = React.useState([]);
  const fetchData = React.useCallback(() => {
    docFetchDataFunc(
      {
        path: match.path
      },
      (value) => {
        const valueCy = [].concat(value)
        const sort = (arr) => {
          arr = sortDocDataMenuFunc(arr)
          arr.forEach((item) => {
            if (isArrFunc(item.children)) {
              item.children = sort(item.children)
            }
          })
          return arr
        }
        const sortValue = sort(valueCy)
        setDocsDataSource(sortValue)

      }
    )
  }, [match.path])

  React.useLayoutEffect(() => {
    fetchData()
  }, [match])
  if (!docsDataSource.length) {
    return (
      null
    )
  }
  return (
    <MenuComponent
      {...props}
      docsDataSource={docsDataSource}
    />
  )
}


export default MenuComponentHoc