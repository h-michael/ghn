// @flow

import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import type { DispatchAPI } from 'redux'
import Index from '../components/tabBar/Index'
import type { ReduxState } from '../reducers'
import type { State as AuthState } from '../reducers/auth'
import { Actions as AuthActions } from '../reducers/auth'

type Props = {
  auth: AuthState,
  authActions: typeof AuthActions,
}

const TabBarContainer = (props: Props) => <Index {...props} />

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
})

const container = connect(mapStateToProps, mapDispatchToProps)(TabBarContainer)

export default container
