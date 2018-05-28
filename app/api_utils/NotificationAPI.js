// @flow

import axios from 'axios'

import Request from './Request'
import NotificationUtil from '../utils/notification'
import Constants from '../constants'

export default {
  fetchNotifications(settings: Object, token: string) {
    const endpointSuffix = `notifications?participating=${
      settings.participating
    }`

    return axios.all([Request.githubAPIRequest('GET', token, endpointSuffix)])
  },

  markNotification(
    id: number,
    hostname: string,
    token: string,
    enterpriseAccounts: Object[],
  ) {
    const url = `${NotificationUtil.generateGitHubAPIUrl(
      hostname,
    )}notifications/threads/${id}`
    const method = 'PATCH'

    const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname
    const enterpriseToken = isEnterprise
      ? this.getEnterpriseAccountToken(hostname, enterpriseAccounts)
      : token

    return Request.apiRequestAuth(url, method, enterpriseToken, {})
  },

  markRepoNotifications(
    repoSlug: string,
    hostname: string,
    token: string,
    enterpriseAccounts: Object[],
  ) {
    const url = `${NotificationUtil.generateGitHubAPIUrl(
      hostname,
    )}repos/${repoSlug}/notifications`
    const method = 'PUT'

    const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname
    const enterpriseToken = isEnterprise
      ? this.getEnterpriseAccountToken(hostname, enterpriseAccounts)
      : token

    return Request.apiRequestAuth(url, method, enterpriseToken, {})
  },

  checkHasStarred(token: string) {
    const url = `https://api.${
      Constants.DEFAULT_AUTH_OPTIONS.hostname
    }/user/starred/${Constants.REPO_SLUG}`
    const method = 'GET'

    return Request.apiRequestAuth(url, method, token)
  },
}
