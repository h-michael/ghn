// @flow

import type { User } from './User'
import type { Repository } from './Repository'
import type { Event } from './Event'

export type CreateEvent = {
  id: number,
  ref: ?string,
  ref_type: 'repository' | 'branch' | 'tag',
  master_branch: string,
  description: string,
  pusher_type: 'User' | 'Organizeation',
  repo: Repository,
  sender: User,
}

export type CreateEventState = CreateEvent & { read: boolean, type: Event }
