// @flow

import type { Repository } from './Repository'

type ReasonType =
  | 'assign'
  | 'author'
  | 'comment'
  | 'invitation'
  | 'manual'
  | 'mention'
  | 'state_change'
  | 'subscribed'
  | 'team_mention'

type SubjectType = 'PullRequest' | 'Issue' | 'Commit' | 'Release'

type Subject = {
  title: string,
  url: string,
  latest_comment_url: string,
  type: SubjectType,
}

export type Notification = {
  id: number,
  repository: Repository,
  subject: Subject,
  reason: ReasonType,
  unread: boolean,
  updated_at: string,
  last_read_at: ?string,
  url: string,
}
