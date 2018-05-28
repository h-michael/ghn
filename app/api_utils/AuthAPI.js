// @flow

import Request from './Request'
import Constants from '../constants'
const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;

function authRequest(
  authOptions: Object,
  callback: Function,
  dispatch: Dispatch<*>,
): any {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: false,
    },
  })

  const githubUrl = `https://${authOptions.hostname}/login/oauth/authorize?`
  const authUrl = `${githubUrl}client_id=${authOptions.clientId}&scope=${Constants.AUTH_SCOPE.join(',')}`

  authWindow.loadURL(authUrl)
  // If "Done" button is pressed, hide "Loading"
  authWindow.on('close', () => {
    authWindow.destroy()
  })

  authWindow.webContents.on(
    'did-fail-load',
    (event, errorCode, errorDescription, validatedURL) => {
      if (validatedURL.includes(authOptions.hostname)) {
        authWindow.destroy()

        dialog.showErrorBox(
          'Invalid Hostname',
          `Could not load https://${authOptions.hostname}`,
        )
      }
    },
  )

  authWindow.webContents.on('will-navigate', (event, url) =>
    callback(dispatch, url, authWindow, authOptions),
  )

  authWindow.webContents.on(
    'did-get-redirect-request',
    (event, oldUrl, newUrl) =>
      callback(dispatch, newUrl, authWindow, authOptions),
  )
}

function loginRequest(authOptions: Object, code: string) {
  const { hostname } = authOptions
  const url = `https://${hostname}/login/oauth/access_token`
  const method = 'POST'
  const data = {
    client_id: authOptions.clientId,
    client_secret: authOptions.clientSecret,
    code,
  }
  return Request.apiRequest(url, method, data)
}

export default { authRequest, loginRequest }
