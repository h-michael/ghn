// @flow

import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import type { DispatchAPI } from 'redux'
import Index from '../components/setting/index/Index'
import type { ReduxState } from '../reducers'
import type { State as AuthState } from '../reducers/auth'
import type { State as SettingState } from '../reducers/setting'
import { Actions as AuthActions } from '../reducers/auth'
import { Actions as SettingActions } from '../reducers/setting'

type Props = {
  auth: AuthState,
  setting: SettingState,
  authActions: typeof AuthActions,
  settingActions: typeof SettingActions,
}

const SettingContainer = (props: Props) => <Index {...props} />

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
  setting: state.setting,
})

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
  settingActions: bindActionCreators(SettingActions, dispatch)
})

const container = connect(mapStateToProps, mapDispatchToProps)(SettingContainer)

export default container
