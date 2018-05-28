/* @flow */

import axios from 'axios'
import type { AxiosPromise } from 'axios'
import Constants from '../constants'

type Method = 'GET' | 'PUT' | 'POST'

export default {
  apiRequest(url: string, method: string, data: Object = {}) {
    axios.defaults.headers.common.Accept = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Cache-Control'] = 'no-cache'
    return axios({ method, url, data })
  },

  apiRequestAuth(
    url: string,
    method: string,
    token: string,
    data: Object = {},
  ) {
    axios.defaults.headers.common.Accept = 'application/json'
    axios.defaults.headers.common.Authorization = `token ${token}`
    axios.defaults.headers.common['Cache-Control'] = 'no-cache'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    return axios({ method, url, data })
  },

  githubAPIRequest(method: Method, token: string, endpoint: string) {
    const url = `https://api.${
      Constants.DEFAULT_AUTH_OPTIONS.hostname
    }/${endpoint}`
    return this.apiRequestAuth(url, method, token)
  },

  enterpriseAPIRequest(method: Method, accounts: Object[], endpoint: string) {
    const promises: AxiosPromise<*, *>[] = accounts.map(account => {
      const { hostname, token } = account
      const url = `https://${hostname}/api/v3/${endpoint}`
      return this.apiRequestAuth(url, method, token)
    })
    return promises
  },
}
