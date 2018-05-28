// @flow

import type { User } from './User'

export type Comment = {
  url: string,
  html_url: string,
  issue_url: string,
  id: number,
  user: User,
  created_at: string,
  updated_at: string,
  body: string,
}
