// @flow

import axios from 'axios'

import Request from './Request'

export default {
  fetchReceivedEvents(token: string, userName: string, page: number = 1) {
    const endpointSuffix = `users/${userName}/received_events?per_page=100&=page=${page}`

    return axios.all([Request.githubAPIRequest('GET', token, endpointSuffix)])
  },
}
