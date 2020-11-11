import React from 'react'
import DocsData from '@docs/__data.json'
import Toc from 'comp/markdown/toc'

const MenuComponent = () => {
  const [active, seActive] = React.useState(-1)
  const handleTocClick = (item, key) => {
    seActive(key)
    window.handleTocClick && window.handleTocClick(item)
  }
  return (
    <ul className="docs-toc-wrapper">
      {
        DocsData.map((item, key) => (
          <li key={key + ''}
            className={`sidebar-item ${key === active ? 'sidebar-item--open' : ''}`}
          >
            <i onClick={() => seActive(active === key ? -1 : key) }className={`sidebar-item__toggle icon-chevron-right`}/>
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
  )
}

export default MenuComponent