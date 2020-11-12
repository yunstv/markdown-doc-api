import React, { PropTypes } from 'react'
import { BrowserRouterProps, HashRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Preview from 'comp/markdown/preview'
import LayoutComponent from 'comp/layout'

const baseName = '/'

// const AppSwitch = (props) => {
//   const AppRoute = (item) => (
//     <Route key={item.path} path={item.path}>
//       {
//         () => {
//             let PageComponent = item.component
//           return (
//             <>
//               <Helmet>
//                 <meta charSet='utf-8' />
//                 <title>{`doc`}</title>
//                 <link rel='canonical' href='' />
//               </Helmet>
//               <PageComponent>
//                 {
//                   Array.isArray(item.routes) ? <AppSwitch routes={item.routes} /> : null
//                 }
//               </PageComponent>
//             </>
//           )
//         }
//       }
//     </Route>
//   )
//   return (
//     <Switch>
//       {
//         Array.isArray(props.routes)
//           ? props.routes.map((item) => AppRoute(item))
//           : null
//       }
//     </Switch>
//   )
// }

const HomePage = () => {
  let location = useLocation()
  let background = location.state && location.state.background;

  return (
      <Switch location={background || location}>
          <Route
            path="/api/:path"
          >
            {
              () => (
                <LayoutComponent>
                  <Switch>
                    <Route path="/api/help" exact>
                      <p>请从左侧目录选取所需查看的文档</p>
                    </Route>
                    <Route>
                      <Preview />
                    </Route>
                   </Switch>
                </LayoutComponent>
              )
            }
          </Route>
      </Switch>
  )
}

const Router = () => {
  return (
    <HashRouter baseName={baseName}>
      <Switch>
        <Route path={'/api'}>
          <HomePage />
        </Route>
        <Redirect from="/" to="/api/help" exact/>
      </Switch>
    </HashRouter>
  )
}

export default Router
