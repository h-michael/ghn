// @flow

import type { User } from './User'

export type Issue = {
  url: string,
  labels_url: string,
  comments_url: string,
  events_url: string,
  html_url: string,
  id: number,
  number: number,
  title: string,
  user: User,
  labels: [
    {
      url: string,
      name: string,
      color: string,
    },
  ],
  state: 'open' | 'closed',
  locked: boolean,
  assignee: ?string,
  milestone: ?string,
  comments: number,
  created_at: string,
  updated_at: string,
  closed_at: ?string,
  body: string,
}
