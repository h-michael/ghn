// @flow

import React, { PureComponent } from 'react'
import { keys, values } from 'ramda'
import { Box } from '../../styled/Box'
import type { State as AuthState } from '../../../reducers/auth'
import type { State as SettingState } from '../../../reducers/setting'
import type { State as RepositoryEventState } from '../../../reducers/repositoryEvent'
import { Actions as RepositoryEventActions } from '../../../reducers/repositoryEvent'
import {
  IssuesEventRow,
  IssueCommentEventRow,
  PullRequestEventRow,
  PullRequestReviewEventRow,
  PullRequestReviewCommentEventRow,
  PushEventRow,
} from '../../eventList/row/index'

type Props = {
  auth: AuthState,
  setting: SettingState,
  repositoryEvent: RepositoryEventState,
  repositoryEventActions: typeof RepositoryEventActions,
}

export default class Index extends PureComponent<Props> {
  componentDidMount() {
    values(this.props.setting.listeningRepositories).forEach((repo) => {
      if (this.props.auth.token) {
        this.props.repositoryEventActions.fetchRepositoryEvents(
          this.props.auth.token, repo.repoOwnerName, repo.repoName
        )
      }
    })
  }

  renderEvents() {
    const { gitHub } = this.props.repositoryEvent
    const rows = []
    if (keys(gitHub).length >= 1) {
      const listeningRepos = this.props.setting.listeningRepositories
      const repoEvents = []
      Object.keys(gitHub).forEach(repoName => {
        if (!repoName || repoName === '') {
          return
        }
        const events = gitHub[repoName]
        if (listeningRepos[repoName].listeningEvent.issuesEvent) {
          repoEvents.push(
            values(events.issuesEvent)
              .filter(event => !event.read)
              .map(event => (
                <IssuesEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        if (listeningRepos[repoName].listeningEvent.issueCommentEvent) {
          repoEvents.push(
            values(events.issueCommentEvent)
              .filter(event => !event.read)
              .map(event => (
                <IssueCommentEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        if (listeningRepos[repoName].listeningEvent.pullRequestEvent) {
          repoEvents.push(
            values(events.pullRequestEvent)
              .filter(event => !event.read)
              .map(event => (
                <PullRequestEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        if (listeningRepos[repoName].listeningEvent.pullRequestReviewEvent) {
          repoEvents.push(
            values(events.pullRequestReviewEvent)
              .filter(event => !event.read)
              .map(event => (
                <PullRequestReviewEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        if (listeningRepos[repoName].listeningEvent.pullRequestReviewEvent) {
          repoEvents.push(
            values(events.pullRequestReviewCommentEvent)
              .filter(event => !event.read)
              .map(event => (
                <PullRequestReviewCommentEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        if (listeningRepos[repoName].listeningEvent.pushEvent) {
          repoEvents.push(
            values(events.pushEvent)
              .filter(event => !event.read)
              .map(event => (
                <PushEventRow
                  key={event.id}
                  actions={this.props.repositoryEventActions}
                  event={event}
                />
              )),
          )
        }
        rows.push(repoEvents)
      })
      return rows
    }
  }

  render() {
    return (
      <Box>
        <Box>
          RepositoryEvent
        </Box>
        {this.renderEvents()}
      </Box>
    )
  }
}
