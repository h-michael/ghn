// @flow

import type { PullRequest } from './PullRequest'
import type { User } from './User'
import type { Repository } from './Repository'
import type { Comment } from './Comment'
import type { Event } from './Event'

export type PullRequestReviewCommentEvent = {
  id: number,
  action: 'created' | 'edited' | 'deleted',
  comment: Comment,
  pull_request: PullRequest,
  repo: Repository,
  sender: User,
}

export type PullRequestReviewCommentEventState = PullRequestReviewCommentEvent & {
  read: boolean,
  type: Event,
}
