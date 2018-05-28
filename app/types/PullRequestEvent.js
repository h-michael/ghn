// @flow

import type { PullRequest } from './PullRequest'
import type { User } from './User'
import type { Event } from './Event'
import type { Repository } from './Repository'

export type PullRequestEvent = {
  id: number,
  action:
    | 'assigned'
    | 'unassigned'
    | 'review_requested'
    | 'review_request_removed'
    | 'labeled'
    | 'unlabeled'
    | 'opened'
    | 'edited'
    | 'closed'
    | 'reopened',
  number: number,
  pull_request: PullRequest,
  repo: Repository,
  sender: User,
  installation: {
    id: number,
  },
}

export type PullRequestEventState = PullRequestEvent & {
  read: boolean,
  type: Event,
}
