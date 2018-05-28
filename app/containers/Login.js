// @flow

import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import type { DispatchAPI } from 'redux'
import Index from '../components/login/Index'
import type { ReduxState } from '../reducers/index'
import { Actions } from '../reducers/auth'

type Props = {
  actions: typeof Actions,
  isEitherLoggedIn: boolean,
}

function isUserEitherLoggedIn(auth) {
  return auth.token !== null || auth.enterpriseAccounts.length > 0
}

const LoginContainer = (props: Props) => <Index {...props} />

const mapStateToProps = (state: ReduxState) => ({
  isEitherLoggedIn: isUserEitherLoggedIn(state.auth),
})

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  actions: bindActionCreators(Actions, dispatch),
})
const container = connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

export default container
