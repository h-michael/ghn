// @flow

import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import type { DispatchAPI } from 'redux'
import Index from '../components/repositoryEvent/index/Index'
import type { ReduxState } from '../reducers'
import type { State as AuthState } from '../reducers/auth'
import type { State as SettingState } from '../reducers/setting'
import type { State as RepositoryEventState } from '../reducers/repositoryEvent'
import { Actions as AuthActions } from '../reducers/auth'
import { Actions as RepositoryEventActions } from '../reducers/repositoryEvent'

type Props = {
  auth: AuthState,
  setting: SettingState,
  repositoryEvent: RepositoryEventState,
  authActions: typeof AuthActions,
  repositoryEventActions: typeof RepositoryEventActions,
}

const RepositoryEventContainer = (props: Props) => <Index {...props} />

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
  repositoryEvent: state.repositoryEvent,
  setting: state.setting,
})

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
  repositoryEventActions: bindActionCreators(RepositoryEventActions, dispatch),
})

const container = connect(mapStateToProps, mapDispatchToProps)(
  RepositoryEventContainer,
)

export default container
