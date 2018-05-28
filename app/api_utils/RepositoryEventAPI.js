// @flow

import axios from 'axios'

import Request from './Request'

export default {
  fetchRepositoryEvents(
    token: string,
    ownerName: string,
    repoName: string,
    page: number = 1,
  ) {
    const endpointSuffix = `repos/${ownerName}/${repoName}/events?per_page=100&=page=${page}`

    return axios.all([Request.githubAPIRequest('GET', token, endpointSuffix)])
  },
}
