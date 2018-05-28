// @flow

import type { User } from './User'
import type { Repository } from './Repository'
import type { Event } from './Event'

export type DeleteEvent = {
  id: number,
  ref: string,
  ref_type: 'branch' | 'tag',
  master_branch: string,
  description: string,
  pusher_type: 'User' | 'Organizeation',
  repo: Repository,
  sender: User,
}

export type DeleteEventState = DeleteEvent & { read: boolean, type: Event }
