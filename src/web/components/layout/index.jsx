import React from 'react'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { docFetchDataFunc } from 'root/utils/util'
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

const Header = (() => {
  const match = useRouteMatch()
  const [title, setTitle] = React.useState('')
  const [list, setList] = React.useState([])
  const setTitleFunc = () => {
      let title = ''
      if (match.path.includes('/inner')) {
        title = 'ETC接口文档(内部版)'
      } else if (match.path.includes('/open')) {
        title = '开放平台接口文档'
      } else {
        title = 'ETC接口文档'
      }
      setTitle(title)
  }
  const fetchData = React.useCallback(() => {
    docFetchDataFunc(
      {
        docsFetchKeyDefault: 'docs-data.txt'
      },
      (value) => {
        setList(value)
      }
    )
  }, [match.path])

  React.useEffect(() => {
    fetchData()
  }, [])
  // React.useEffect(() => {
  //   setTitleFunc()
  // }, [match])

  return (
    <header className="ant-layout-header">
      <div className="ant-layout-div">
        {
          list.map((item, index) => (
            <NavLink
              key={'' + index}
              to={item.route}
              activeStyle={{
                color: "#fff"
              }}
            >
              {item.label}
            </NavLink>
          ))
        }
      </div>
    </header>
  )
})

const LayoutComponent = (props) => {  
  return (
    <section className="ant-layout">
      <Header />
      <section className="ant-layout ant-layout-has-sider">
        <aside className="ant-layout-sider ant-layout-sider-dark"
        >
          <div className="ant-layout-sider-children"
            style={{
              overflowY: 'auto',
              paddingBottom: '50px'
            }}
          >
            <Menu inner={props.inner}/>
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