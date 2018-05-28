/* @flow */

import AuthAPI from '../api_utils/AuthAPI'
import Constants from '../constants'

type AUTH_START = { type: 'AUTH_START' }
// type AUTH_SUCCESS = {
//   type: 'AUTH_SUCCESS',
//   payload: Object,
// }
type FAILURE = { type: 'LOGIN_FAILURE', payload: Object }
export function loginUser(authOptions: Object, code: string) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'LOGIN_START' })
    const { hostname } = authOptions
    const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname

    const promise = AuthAPI.loginRequest(authOptions, code)
    if (promise) {
      promise
        .then(response =>
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data,
            isEnterprise,
            hostname,
          }),
        )
        .catch(error =>
          dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data }),
        )
    }
  }
}

function handleAuthCallback(
  dispatch: Dispatch<*>,
  url: string,
  authWindow: any,
  authOptions: Object,
) {
  const rawCode = /code=([^&]*)/.exec(url) || null
  const code = rawCode && rawCode.length > 1 ? rawCode[1] : null
  const error = /\?error=(.+)$/.exec(url)

  if (code || error) {
    authWindow.destroy()
  }

  if (code) {
    return dispatch(loginUser(authOptions, code))
  } else if (error) {
    window.alert(
      "Oops! Something went wrong and we couldn't " +
        'log you in using Github. Please try again.',
    )
  }
  return false
}

function authGithub(authOptions: Object = Constants.DEFAULT_AUTH_OPTIONS) {
  return (dispatch: Dispatch<*>) => {
    AuthAPI.authRequest(authOptions, handleAuthCallback, dispatch)
  }
}

type START = { type: 'LOGIN_START' }
type SUCCESS = {
  type: 'LOGIN_SUCCESS',
  payload: Object,
  isEnterprise: boolean,
  hostname: string,
}

type LOGOUT = { type: 'LOGOUT' }
function logout() {
  return { type: 'LOGOUT' }
}

type ActionType = AUTH_START | START | SUCCESS | FAILURE | LOGOUT

export type State = {
  response: ?Object,
  token: ?string,
  isFetching: false,
  failed: false,
  enterpriseAccounts: Object[],
}

const initialState: State = {
  response: {},
  token: null,
  isFetching: false,
  failed: false,
  enterpriseAccounts: [],
}

export default function reducer(
  state: State = initialState,
  action: ActionType,
) {
  let updateState = {}
  switch (action.type) {
    case 'LOGIN_START': {
      updateState = {
        isFetching: true,
        failed: false,
        response: {},
      }
      return Object.assign({}, state, updateState)
    }
    case 'LOGIN_SUCCESS': {
      updateState = {
        isFetching: false,
        token: action.payload.access_token,
        failed: false,
      }
      return Object.assign({}, state, updateState)
    }
    case 'LOGIN_FAILURE': {
      updateState = {
        isFetching: false,
        token: action.payload,
        failed: true,
      }
      return Object.assign({}, state, updateState)
    }
    case 'LOGOUT': {
      updateState = {
        token: null,
        response: null,
        enterpriseAccounts: [],
      }
      return Object.assign({}, state, updateState)
    }
    default: {
      return state
    }
  }
}

export const Actions = { authGithub, loginUser, logout }
