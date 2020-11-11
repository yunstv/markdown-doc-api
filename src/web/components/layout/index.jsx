import React from 'react'
import './index.scss'
import Menu from './menu'

const LayoutComponent = (props) => {
  return (
    <section className="ant-layout">
      <header className="ant-layout-header">
        <div className="ant-layout-div">
          接口文档
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