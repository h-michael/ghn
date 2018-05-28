// @flow

import type { User } from './User'
import type { Repository } from './Repository'
import type { Comment } from './Comment'
import type { Event } from './Event'

export type PushEvent = {
  id: number,
  ref: string,
  before: string,
  after: string,
  created: boolean,
  deleted: boolean,
  forced: boolean,
  base_ref: ?string,
  compare: string,
  commits: Comment[],
  head_commit: {
    id: string,
    tree_id: string,
    distinct: boolean,
    message: string,
    timestamp: string,
    url: string,
    author: {
      name: string,
      email: string,
      username: string,
    },
    committer: {
      name: string,
      email: string,
      username: string,
    },
    added: string[],
    removed: string[],
    modified: string[],
  },
  repo: Repository,
  pusher: {
    name: string,
    email: string,
  },
  sender: User,
}

export type PushEventState = PushEvent & { read: boolean, type: Event }
