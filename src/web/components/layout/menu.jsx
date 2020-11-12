import React from 'react'
import DocsData from '@docs/__data.json'
import Toc from 'comp/markdown/toc'
import { useHistory, withRouter, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Str = (str, v = '/') => str.replace(/\.json$/g, v)
let time
const MenuComponent = () => {

  let history = useHistory();
  const [active, seActive] = React.useState(-1)
  const params = useParams();
  const handleTocClick = (item, key) => {
    seActive(() => {
      const sourcePath = DocsData[key]?.path
      if (sourcePath !== params.path) {
        const path = '/api/' + sourcePath
        path && history.replace(Str(path))
        window.handleTocClick && window.handleTocClick(item)
      }
      return active === key ? -1 : key
    })
  }
  React.useLayoutEffect(() => {
    const findPathIndex = DocsData.findIndex((item) => Str(item.path, '') === params.path)
    let time = setTimeout(() => {
      seActive(findPathIndex)
      window.handleTocClick && window.handleTocClick(DocsData[findPathIndex])
    }, 500)
    return () => {
      time && clearTimeout(time)
    }
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`接口文档-${DocsData[active]?.fileName||''}`}</title>
        <link rel='canonical' href='' />
      </Helmet>
      <ul className="docs-toc-wrapper">
        {
          DocsData.map((item, key) => (
            <li key={key + ''}
              className={`sidebar-item ${key === active ? 'sidebar-item--open' : ''}`}
            >
              <i onClick={() => handleTocClick(item, key)  }
                className={`sidebar-item__toggle icon-chevron-right`}
              />
              <p onClick={() => handleTocClick(item, key) }
                className="sidebar-item__title"
              >
                {item.fileName}
              </p>
              <Toc tocData={item.toc} handleTocClick={() => {}} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default MenuComponent