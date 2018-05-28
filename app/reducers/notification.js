/* @flow */

import axios from 'axios'
import { parse } from 'url'
import NotificationAPI from '../api_utils/NotificationAPI'
import Constants from '../constants'
import type { Notification } from '../types/Notification'

type ResponseType = {
  hostname: string,
  notifications: Notification[],
}

type NOTIFICATIONS_START = { type: 'NOTIFICATIONS_START' }
type NOTIFICATIONS_SUCCESS = {
  type: 'NOTIFICATIONS_SUCCESS',
  payload: ResponseType[],
}
type NOTIFICATIONS_FAILURE = { type: 'NOTIFICATIONS_FAILURE', payload: Object }
function fetchNotifications(settings: Object, token: string) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'NOTIFICATIONS_START' })
    const isGitHubLoggedIn = token !== null
    const promise = NotificationAPI.fetchNotifications(settings, token)
    if (promise) {
      promise
        .then(
          axios.spread((gitHubNotifications, ...entAccNotifications) => {
            const notifications = entAccNotifications.map(accNotifications => {
              const { hostname } = parse(accNotifications.config.url)

              return {
                hostname,
                notifications: accNotifications.data,
              }
            })

            if (isGitHubLoggedIn) {
              notifications.push({
                hostname: Constants.DEFAULT_AUTH_OPTIONS.hostname,
                notifications: gitHubNotifications.data,
              })
            }

            dispatch({
              type: 'NOTIFICATIONS_SUCCESS',
              payload: notifications,
            })
          }),
        )
        .catch(error =>
          dispatch({
            type: 'NOTIFICATIONS_FAILURE',
            payload: error.response.data,
          }),
        )
    } else {
      dispatch({ type: 'NOTIFICATIONS_FAILURE', payload: {} })
    }
  }
}

type MARK_NOTIFICATION_START = { type: 'MARK_NOTIFICATION_START' }
type MARK_NOTIFICATION_SUCCESS = {
  type: 'MARK_NOTIFICATION_SUCCESS',
  payload: Object,
  meta: { id: number, hostname: string },
}
type MARK_NOTIFICATION_FAILURE = {
  type: 'MARK_NOTIFICATION_FAILURE',
  payload: Object,
}
function markNotification(
  id: number,
  hostname: string,
  token: string,
  enterpriseAccounts: Object[],
) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'MARK_NOTIFICATION_START' })
    const promise = NotificationAPI.markNotification(
      id,
      hostname,
      token,
      enterpriseAccounts,
    )
    if (promise) {
      promise
        .then(response => {
          dispatch({
            type: 'MARK_NOTIFICATION_SUCCESS',
            payload: response ? response.data : {},
            meta: { id, hostname },
          })
        })
        .catch(error => {
          dispatch({
            type: 'MARK_NOTIFICATION_FAILURE',
            payload: error.response.data,
          })
        })
    } else {
      dispatch({
        type: 'MARK_NOTIFICATION_FAILURE',
        payload: {},
      })
    }
  }
}

type HAS_STARRED_START = { type: 'HAS_STARRED_REQUEST' }
type HAS_STARRED_SUCCESS = { type: 'HAS_STARRED_SUCCESS', payload: Object }
type HAS_STARRED_FAILURE = { type: 'HAS_STARRED_FAILURE', payload: Object }

// function checkHasStarred(token: string) {
//   return (dispatch: Dispatch<*>) => {
//     dispatch({ type: 'HAS_STARRED_START' })
//     const promise = NotificationAPI.checkHasStarred(token)
//
//     if (promise) {
//       promise
//         .then(response => {
//           dispatch({ type: 'HAS_STARRED_SUCCESS', payload: response.data })
//         })
//         .catch(error => {
//           dispatch({
//             type: 'HAS_STARRED_FAILURE',
//             payload: error.response.data,
//           })
//         })
//     } else {
//       dispatch({ type: 'HAS_STARRED_FAILURE', payload: {} })
//     }
//   }
// }

type MARK_REPO_NOTIFICATION_START = { type: 'MARK_REPO_NOTIFICATION_START' }
type MARK_REPO_NOTIFICATION_SUCCESS = {
  type: 'MARK_REPO_NOTIFICATION_SUCCESS',
  payload: Object,
  meta: { hostname: string, repoSlug: string },
}
type MARK_REPO_NOTIFICATION_FAILURE = {
  type: 'MARK_REPO_NOTIFICATION_FAILURE',
  payload: Object,
}
function markRepoNotifications(
  repoSlug: string,
  hostname: string,
  token: string,
  enterpriseAccounts: Object[],
) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'MARK_REPO_NOTIFICATION_START' })
    const promise = NotificationAPI.markRepoNotifications(
      repoSlug,
      hostname,
      token,
      enterpriseAccounts,
    )
    if (promise) {
      promise
        .then(response => {
          dispatch({
            type: 'MARK_REPO_NOTIFICATION_SUCCESS',
            payload: response.data,
            meta: { hostname, repoSlug },
          })
        })
        .catch(error => {
          dispatch({
            type: 'MARK_REPO_NOTIFICATION_FAILURE',
            payload: error.response.data,
          })
        })
    } else {
      dispatch({
        type: 'MARK_REPO_NOTIFICATION_FAILURE',
        payload: {},
      })
    }
  }
}

type SEARCH_NOTIFICATIONS = {
  type: 'SEARCH_NOTIFICATIONS',
  query: string,
}
// function searchNotifications(query) {
//   return (dispatch: Dispatch<*>) =>
//     dispatch({
//       type: 'SEARCH_NOTIFICATIONS',
//       query,
//     })
// }

type CLEAR_SEARCH = { type: 'CLEAR_SEARCH' }
// function clearSearch() {
//   return (dispatch: Dispatch<*>) =>
//     dispatch({
//       type: 'CLEAR_SEARCH',
//     })
// }
type ActionType =
  | NOTIFICATIONS_START
  | NOTIFICATIONS_SUCCESS
  | NOTIFICATIONS_FAILURE
  | MARK_NOTIFICATION_START
  | MARK_NOTIFICATION_SUCCESS
  | MARK_NOTIFICATION_FAILURE
  | HAS_STARRED_START
  | HAS_STARRED_SUCCESS
  | HAS_STARRED_FAILURE
  | MARK_REPO_NOTIFICATION_START
  | MARK_REPO_NOTIFICATION_SUCCESS
  | MARK_REPO_NOTIFICATION_FAILURE
  | SEARCH_NOTIFICATIONS
  | CLEAR_SEARCH

export type State = {
  response: ResponseType[],
  isFetching: boolean,
  failed: boolean,
}

const initialState = {
  response: [],
  isFetching: false,
  failed: false,
}

export default function reducer(
  state: State = initialState,
  action: ActionType,
) {
  switch (action.type) {
    case 'NOTIFICATIONS_START':
      return Object.assign({}, state, { isFetching: true, failed: false })
    case 'NOTIFICATIONS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        failed: false,
        response: action.payload,
      })
    case 'NOTIFICATIONS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        failed: true,
        response: {},
      })
    case 'MARK_NOTIFICATION_SUCCESS':
      return state
    case 'MARK_REPO_NOTIFICATION_SUCCESS':
      return state
    // case 'LOGOUT':
    //   return initialState;
    default:
      return state
  }
}

export const Actions = {
  fetchNotifications,
  markNotification,
  markRepoNotifications,
}
