// @flow

import type { CreateEvent, CreateEventState } from './CreateEvent'
import type { DeleteEvent, DeleteEventState } from './DeleteEvent'
import type {
  CommitCommentEvent,
  CommitCommentEventState,
} from './CommitCommentEvent'
import type {
  IssueCommentEvent,
  IssueCommentEventState,
} from './IssueCommentEvent'
import type { IssuesEvent, IssuesEventState } from './IssuesEvent'
import type {
  PullRequestEvent,
  PullRequestEventState,
} from './PullRequestEvent'
import type {
  PullRequestReviewEvent,
  PullRequestReviewEventState,
} from './PullRequestReviewEvent'
import type {
  PullRequestReviewCommentEvent,
  PullRequestReviewCommentEventState,
} from './PullRequestReviewCommentEvent'
import type { PushEvent, PushEventState } from './PushEvent'

type UseType =
  | CreateEvent
  | CreateEventState
  | DeleteEvent
  | DeleteEventState
  | CommitCommentEvent
  | CommitCommentEventState
  | IssueCommentEvent
  | IssueCommentEventState
  | IssuesEvent
  | IssuesEventState
  | PullRequestEvent
  | PullRequestEventState
  | PullRequestReviewEvent
  | PullRequestReviewEventState
  | PullRequestReviewCommentEvent
  | PullRequestReviewCommentEventState
  | PushEvent
  | PushEventState

type UseStringType =
  | 'CreateEvent'
  | 'CreateEventState'
  | 'DeleteEvent'
  | 'DeleteEventState'
  | 'CommitCommentEvent'
  | 'CommitCommentEventState'
  | 'issueCommentEventState'
  | 'issueCommentEvent'
  | 'issuesEvent'
  | 'issuesEventState'
  | 'pullRequestEvent'
  | 'pullRequestEventState'
  | 'pullRequestReviewEvent'
  | 'pullRequestReviewEventState'
  | 'pullRequestReviewCommentEvent'
  | 'pullRequestReviewCommentEventState'
  | 'pushEvent'
  | 'pushEventState'

export type {
  UseType,
  UseStringType,
  CreateEvent,
  CreateEventState,
  DeleteEvent,
  DeleteEventState,
  CommitCommentEvent,
  CommitCommentEventState,
  IssueCommentEvent,
  IssueCommentEventState,
  IssuesEvent,
  IssuesEventState,
  PullRequestEvent,
  PullRequestEventState,
  PullRequestReviewEvent,
  PullRequestReviewEventState,
  PullRequestReviewCommentEvent,
  PullRequestReviewCommentEventState,
  PushEvent,
  PushEventState,
}
