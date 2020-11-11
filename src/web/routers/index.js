import React, { PropTypes } from 'react'
import { BrowserRouterProps, HashRouter, Route, Switch, redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Preview from 'comp/markdown/preview'
import LayoutComponent from 'comp/layout'


const baseName = '/'

const AppSwitch = (props) => {
  const AppRoute = (item) => (
    <Route key={item.path} path={item.path}>
      {
        () => {
            let PageComponent = item.component
          return (
            <>
              <Helmet>
                <meta charSet='utf-8' />
                <title>{`doc`}</title>
                <link rel='canonical' href='' />
              </Helmet>
              <PageComponent>
                {
                  Array.isArray(item.routes) ? <AppSwitch routes={item.routes} /> : null
                }
              </PageComponent>
            </>
          )
        }
      }
    </Route>
  )
  return (
    <Switch>
      {
        Array.isArray(props.routes)
          ? props.routes.map((item) => AppRoute(item))
          : null
      }
    </Switch>
  )
}

const Router = () => {
  return (
    <HashRouter baseName={baseName}>
      {/* <AppSwitch routes={routesConfg} /> */}
          
      <Switch>
        <Route key={'/'} path={'/'}>
          {
            () => (
              <LayoutComponent>
                <Switch>
                  <Route key={'/'} path={'/'}>
                    {
                      () => <Preview />
                    }
                  </Route>
                </Switch>
              </LayoutComponent>
            )
          }
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default Router
