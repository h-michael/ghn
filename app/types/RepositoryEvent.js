// @flow

import type { Event } from './Event'
import type { CreateEvent } from './CreateEvent'
import type { DeleteEvent } from './DeleteEvent'
import type { IssuesEvent } from './IssuesEvent'
import type { IssueCommentEvent } from './IssueCommentEvent'
import type { PushEvent } from './PushEvent'
import type { PullRequestEvent } from './PullRequestEvent'
import type { PullRequestReviewEvent } from './PullRequestReviewEvent'
import type { PullRequestReviewCommentEvent } from './PullRequestReviewCommentEvent'

type UseEvent =
  | CreateEvent
  | DeleteEvent
  | IssueCommentEvent
  | IssuesEvent
  | PullRequestEvent
  | PullRequestReviewEvent
  | PullRequestReviewCommentEvent
  | PushEvent

export type RepositoryEvent = {
  type: Event,
  public: boolean,
  payload: UseEvent,
  repo: {
    id: number,
    name: string,
    url: string,
  },
  actor: {
    id: number,
    login: string,
    gravatar_id: number,
    avatar_url: string,
    url: string,
  },
  org: {
    id: number,
    login: string,
    gravatar_id: number,
    url: string,
    avatar_url: string,
  },
  created_at: string,
  id: number,
}
