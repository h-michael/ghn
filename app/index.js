// @flow

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import { PersistGate } from 'redux-persist/integration/react'
import configStore from './store'
import { Layout, SideBar, Content } from './components/styled/Layout'
import TabBarContainer from './containers/TabBar'
import LoginContainer from './containers/Login'
import RepositoryEventContainer from './containers/RepositoryEvent'
import SettingContainer from './containers/Setting'
// import ReceivedEventContainer from './containers/ReceivedEvent'

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-react-devtools').install()
}
const routerHistory = createMemoryHistory()
const persistStore = configStore()

const mountTarget = window.document.getElementById('root')

type RouteType = {|
  component: any,
  path: string,
  exact: boolean,
|}

const PrivateRoute = (args: RouteType) => {
  const authReducer = persistStore.store.getState().auth
  const isAuthenticated =
    authReducer.token !== null || authReducer.enterpriseAccounts.size > 0

  return isAuthenticated ? (
    <Route component={args.component} path={args.path} exact={args.exact} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
}

window.onload = () => {
  if (mountTarget) {
    render(
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <ConnectedRouter history={routerHistory}>
            <Layout>
              <SideBar>
                <Route component={TabBarContainer} />
              </SideBar>
              <Content>
                <Switch>
                  <PrivateRoute
                    path="/"
                    exact
                    component={RepositoryEventContainer}
                  />
                  <Route path="/setting" component={SettingContainer} />
                  <Route path="/login" component={LoginContainer} />
                </Switch>
              </Content>
            </Layout>
          </ConnectedRouter>
        </PersistGate>
      </Provider>,
      mountTarget,
    )
  }
}
