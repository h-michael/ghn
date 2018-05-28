// @flow

import { combineReducers } from 'redux'
import auth from './auth'
import setting from './setting'
import notification from './notification'
import receivedEvent from './receivedEvent'
import repositoryEvent from './repositoryEvent'
import type { State as AuthState } from './auth'
import type { State as SettingState } from './setting'
import type { State as NotificationState } from './notification'
import type { State as ReceivedEventState } from './receivedEvent'
import type { State as RepositoryEventState } from './repositoryEvent'

export type ReduxState = {
  auth: AuthState,
  setting: SettingState,
  notification: NotificationState,
  receivedEvent: ReceivedEventState,
  repositoryEvent: RepositoryEventState,
}

const rootReducers = combineReducers({
  auth,
  setting,
  notification,
  receivedEvent,
  repositoryEvent,
})
export default rootReducers
