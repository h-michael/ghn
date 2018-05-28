// @flow

import type { User } from './User'
import type { Repository } from './Repository'
import type { Comment } from './Comment'
import type { Event } from './Event'

export type CommitCommentEvent = {
  action: 'created' | 'edited' | 'deleted',
  comment: Comment,
  repo: Repository,
  sender: User,
}

export type CommitCommentEventState = CommitCommentEvent & {
  read: boolean,
  type: Event,
}
