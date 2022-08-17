import React, { PropTypes } from 'react'
import { BrowserRouterProps, HashRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Preview from 'comp/markdown/preview'
import LayoutComponent from 'comp/layout'

const baseName = '/'

const Router = () => {
  const text = '请从左侧目录选取所需文档查看'
  return (
    <HashRouter baseName={baseName}>
      <Switch>
        {/* <Route path={'/api'}>
          <HomePage />
        </Route> */}
        <Route path="/api/:path">
          <LayoutComponent>
            <Switch>
              <Route path="/api/help" exact>
                <p>{text}</p>
              </Route>
              <Route>
                <Preview />
              </Route>
            </Switch>
          </LayoutComponent>
        </Route>
        <Route path="/open/:path">
          <LayoutComponent>
            <Switch>
              <Route path="/open/help" exact>
                <p>{text}</p>
              </Route>
              <Route>
                <Preview />
              </Route>
            </Switch>
          </LayoutComponent>
        </Route>

        <Route path="/inner/:path">
          <LayoutComponent>
            <Switch>
              <Route path="/inner/help" exact>
                <p>{text}</p>
              </Route>
              <Route>
                <Preview />
              </Route>
            </Switch>
          </LayoutComponent>
        </Route>

        <Redirect from="/open" to="/open/help" exact/>
        <Redirect from="/inner" to="/inner/help" exact/>
        <Redirect from="/api" to="/api/help" exact/>
        <Redirect from="/" to="/api/help" exact/>
      </Switch>
    </HashRouter>
  )
}

export default Router
