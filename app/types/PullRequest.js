// @flow

import type { User } from './User'
import type { Repository } from './Repository'

export type PullRequest = {
  url: string,
  id: number,
  html_url: string,
  diff_url: string,
  patch_url: string,
  issue_url: string,
  number: number,
  state: 'open' | 'closed' | 'all',
  locked: boolean,
  title: string,
  user: User,
  body: string,
  created_at: string,
  updated_at: string,
  closed_at: ?string,
  merged_at: ?string,
  merge_commit_sha: ?string,
  assignee: ?string,
  milestone: ?string,
  commits_url: string,
  review_comments_url: string,
  review_comment_url: string,
  comments_url: string,
  statuses_url: string,
  head: {
    label: string,
    ref: string,
    sha: string,
    user: User,
    repo: Repository,
  },
  base: {
    label: string,
    ref: string,
    sha: string,
    user: User,
    repo: Repository,
  },
  _links: {
    self: {
      href: string,
    },
    html: {
      href: string,
    },
    issue: {
      href: string,
    },
    comments: {
      href: string,
    },
    review_comments: {
      href: string,
    },
    review_comment: {
      href: string,
    },
    commits: {
      href: string,
    },
    statuses: {
      href: string,
    },
  },
  merged: boolean,
  mergeable: ?boolean,
  mergeable_state: 'unknown' | 'clean' | 'unstable',
  merged_by: ?string,
  comments: number,
  review_comments: number,
  commits: number,
  additions: number,
  deletions: number,
  changed_files: number,
}
