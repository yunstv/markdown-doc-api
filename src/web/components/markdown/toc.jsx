import React from 'react'
import { withRouter } from 'react-router-dom'

let time
const Toc = (props) => {
  const {
    tocData = [],
    history,
    location,
    match
  } = props
  
  React.useLayoutEffect(() => {
    scrollTo(location.hash, true, 1500)
    return () => {
       clearTimeout(time)
    }
  }, [])
  const scrollTo = (id, notPush = false, s = 0) => {
    clearTimeout(time)
    time = setTimeout(() => {
      const dom = document.querySelector(id)
      window.scrollTo({ 
        top: dom.offsetTop - 80, 
        behavior: "smooth" 
      });
    }, s)
    notPush || history.push(`${match.url}#${id.replace(/^#/, '')}`)
  }
  const handleClick = (item) => {
    scrollTo('#' + item.id, false, 0)
    // props.handleTocClick(item)
  }
  return (
    <ul className="toc-wrapper sidebar-item__anchors">
      {
        tocData.map((item, index) => (
          <li
            key={index + ''}
            className="sidebar-item__anchor"
            onClick={() => handleClick(item)}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        ))
      }
    </ul>
  )
}

export default withRouter(Toc)