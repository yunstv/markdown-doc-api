import React from 'react'
import DocsData from '@docs/__data.json'
import Toc from './toc'
import './style'

/**
 * 解析目录
 * 获取字符集指定字符
 * `<h3 id="{id}" >{value}</h3>`
 * @param {string} str 
 */
const doctoc = (str) => {
  const tocArr = []
  // var str = `<h3 id="styling" >  Styling  </h3><h3 id="styling2">Sty li ng2</h3><h3 id="styling3"> S  t y-l-i ng3 </h3>`
  const reg = new RegExp(/\<h.{2}id=("\S*")?\s*>(\s*?[\S|\s]*?\s*)<\/h\w>/g)
  const findToc = [...str.matchAll(reg)].map((item) => ({
    id: item[1].replace(/"/g, ''),
    value: item[2],
    index: item.index
  }))
  return findToc
}

console.log(DocsData);

const PreView = (props) => {
  const { __html } = props
  if (!__html) {
    return null
  }
  return (
    <div className="markdown-wrapper">
      <div className="markdown github" dangerouslySetInnerHTML={{ __html }} ></div>
      {/* <Toc tocData={doctoc(__html)} handleTocClick={props.handleTocClick} /> */}
    </div>
  )
}

class PreViewComponent extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      __html: ''
    }
  }

  handleTocClick(activeValue) {
    this.fetchData(activeValue.path)
  }

  fetchData(path) {
    fetch(`/docs/${path}`)
    .then((response) => response.json())
    .then((res) => {
      this.setState({
        __html: res.__html,
      })
    })
  }

  componentDidMount() {
    this.fetchData(DocsData[0].path)
    window.handleTocClick = (activeValue) => this.handleTocClick(activeValue)
  }

  render() {
    return (
     <>
      <PreView
        __html={this.state.__html}
        handleTocClick={this.handleTocClick}
      />
     </> 
    )
  }
}

export default PreViewComponent