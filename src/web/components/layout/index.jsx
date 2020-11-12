import React from 'react'
import './index.scss'
import Menu from './menu'

const Hours = () => {
  const now = new Date()
  const hour = now.getHours() 
  let day
  const setDay = (d) => {
    day = d
  }
  if(hour < 6) setDay("凌晨好！")
  else if (hour < 9) setDay("早上好！")
  else if (hour < 12) setDay("上午好！")
  else if (hour < 14) setDay("中午好！")
  else if (hour < 17) setDay("下午好！")
  else if (hour < 19) setDay("傍晚好！")
  else if (hour < 22) setDay("晚上好！")
  else setDay("夜里好！")
  return day
}

const LayoutComponent = (props) => {
  return (
    <section className="ant-layout">
      <header className="ant-layout-header">
        <div className="ant-layout-div">
          接口文档
          <div style={{float: 'right'}}>hi,{Hours()}</div>
        </div>
      </header>
      <section className="ant-layout ant-layout-has-sider">
        <aside className="ant-layout-sider ant-layout-sider-dark"
        >
          <div className="ant-layout-sider-children">
            <Menu />
          </div>
        </aside>
        <main className="ant-layout-content">
          <React.Suspense fallback={<div>loading...</div>}>
            {
              props.children
            }
          </React.Suspense>
        </main>
      </section>
      {/* <footer className="ant-layout-footer">
        Footer
      </footer> */}
    </section>
  )
}

export default LayoutComponent