// @flow

import type { User } from './User'
import type { Issue } from './Issue'
import type { Repository } from './Repository'
import type { Event } from './Event'

type Action =
  | 'assigned'
  | 'unassigned'
  | 'labeled'
  | 'unlabeled'
  | 'opened'
  | 'edited'
  | 'milestoned'
  | 'demilestoned'
  | 'closed'
  | 'reopened'

export type IssuesEvent = {
  id: number,
  action: Action,
  issue: Issue,
  repo: Repository,
  sender: User,
}

export type IssuesEventState = IssuesEvent & { read: boolean, type: Event }
