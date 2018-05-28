// @flow

import type { PullRequest } from './PullRequest'
import type { User } from './User'
import type { Repository } from './Repository'
import type { Event } from './Event'

export type PullRequestReviewEvent = {
  id: number,
  action: 'submitted' | 'edited' | 'dismissed',
  review: {
    id: number,
    user: User,
    body: string,
    submitted_at: string,
    state: 'approved' | 'pending' | 'request_changes' | 'comment',
    html_url: string,
    pull_request_url: string,
    _links: {
      html: {
        href: string,
      },
      pull_request: {
        href: string,
      },
    },
  },
  pull_request: PullRequest,
  repo: Repository,
  sender: User,
}

export type PullRequestReviewEventState = PullRequestReviewEvent & {
  read: boolean,
  type: Event,
}
