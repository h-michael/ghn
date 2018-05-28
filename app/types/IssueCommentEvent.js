// @flow

import type { User } from './User'
import type { Event } from './Event'
import type { Issue } from './Issue'
import type { Comment } from './Comment'
import type { Repository } from './Repository'

export type IssueCommentEvent = {
  id: number,
  action: 'created' | 'edited' | 'deleted',
  issue: Issue,
  comment: Comment,
  repo: Repository,
  sender: User,
}

export type IssueCommentEventState = IssueCommentEvent & {
  read: boolean,
  type: Event,
}
