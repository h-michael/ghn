// @flow

import { parse } from 'url'
import Constants from '../constants'

export function getEnterpriseAccountToken(hostname: string, accounts: Object) {
  return accounts.find(obj => obj.get('hostname') === hostname).get('token')
}

export function generateGitHubAPIUrl(hostname: string) {
  const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname
  return isEnterprise
    ? `https://${hostname}/api/v3/`
    : `https://api.${hostname}/`
}

export function generateGitHubWebUrl(url: string) {
  const { hostname } = parse(url)
  const isEnterprise =
    hostname !== `api.${Constants.DEFAULT_AUTH_OPTIONS.hostname}`

  if (hostname) {
    let newUrl = isEnterprise
      ? url.replace(`${hostname}/api/v3/repos`, hostname)
      : url.replace('api.github.com/repos', 'www.github.com')

    if (newUrl.indexOf('/pulls/') !== -1) {
      newUrl = newUrl.replace('/pulls/', '/pull/')
    }

    if (newUrl.indexOf('/releases/') !== -1) {
      newUrl = newUrl.replace('/repos', '')
      newUrl = newUrl.substr(0, newUrl.lastIndexOf('/'))
    }

    return newUrl
  }
  return null
}

export function isUserEitherLoggedIn(auth: Object) {
  return auth.token !== null || auth.enterpriseAccounts.size > 0
}
