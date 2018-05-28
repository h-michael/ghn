/* @flow */

import _ from 'lodash'
import axios from 'axios'
import { parse } from 'url'
import RepositoryEventAPI from '../api_utils/RepositoryEventAPI'
import type { RepositoryEvent } from '../types/RepositoryEvent'
import type {
  CreateEventState,
  DeleteEventState,
  CommitCommentEventState,
  IssueCommentEventState,
  IssuesEventState,
  PullRequestEventState,
  PullRequestReviewEventState,
  PullRequestReviewCommentEventState,
  PushEventState,
} from '../types/EventIndex'

type ResponseType = {
  gitHub: {
    repoName: string,
    events: RepositoryEvent[],
  },
  entAcc: {
    hostname: string,
    events: RepositoryEvent[],
  }[],
}

type REPOSITORY_EVENT_START = { type: 'REPOSITORY_EVENT_START' }
type REPOSITORY_EVENT_SUCCESS = {
  type: 'REPOSITORY_EVENT_SUCCESS',
  payload: ResponseType,
}
type REPOSITORY_EVENT_FAILURE = {
  type: 'REPOSITORY_EVENT_FAILURE',
  payload: Object,
}
function fetchRepositoryEvents(
  token: string,
  ownerName: string,
  repoName: string,
) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'REPOSITORY_EVENT_START' })
    const isGitHubLoggedIn = token !== null
    const promise = RepositoryEventAPI.fetchRepositoryEvents(
      token,
      ownerName,
      repoName,
    )
    if (promise) {
      promise
        .then(
          axios.spread((gitHubRepositoryEvents, ...entAccRepositoryEvents) => {
            const entAcc = entAccRepositoryEvents.map(accRepositoryEvents => {
              const { hostname } = parse(accRepositoryEvents.config.url)

              return {
                hostname,
                events: accRepositoryEvents.data,
              }
            })

            const gitHub = {
              repoName: `${ownerName}/${repoName}`,
              events: [],
            }

            if (isGitHubLoggedIn) {
              gitHub.events = gitHubRepositoryEvents.data
            }

            dispatch({
              type: 'REPOSITORY_EVENT_SUCCESS',
              payload: { gitHub, entAcc },
            })
          }),
        )
        .catch(error => {
          dispatch({
            type: 'REPOSITORY_EVENT_FAILURE',
            payload: error.response,
          })
        })
    } else {
      dispatch({
        type: 'REPOSITORY_EVENT_FAILURE',
        payload: { gitHub: [], entAcc: [] },
      })
    }
  }
}

type READ_REPOSITORY_EVENT = {
  type: 'READ_REPOSITORY_EVENT',
  payload: {
    repoName: string,
    eventType: string,
    eventId: number,
  },
}

function readRepositoryEvent(
  repoName: string,
  eventType: string,
  eventId: number,
) {
  return (dispatch: Dispatch<*>) => {
    dispatch({
      type: 'READ_REPOSITORY_EVENT',
      payload: { repoName, eventType, eventId },
    })
  }
}

type REMOVE_LISTENING_REPOSITORY = {
  type: 'REMOVE_LISTENING_REPOSITORY',
  payload: { repoOwnerName: string, repoName: string },
}

type ActionType =
  | REPOSITORY_EVENT_START
  | REPOSITORY_EVENT_SUCCESS
  | REPOSITORY_EVENT_FAILURE
  | READ_REPOSITORY_EVENT
  | REMOVE_LISTENING_REPOSITORY

type RepoId = number

type Events = {
  createEvent: { [RepoId]: CreateEventState },
  deleteEvent: { [RepoId]: DeleteEventState },
  commitCommentEvent: { [RepoId]: CommitCommentEventState },
  issueCommentEvent: { [RepoId]: IssueCommentEventState },
  issuesEvent: { [RepoId]: IssuesEventState },
  pullRequestEvent: { [RepoId]: PullRequestEventState },
  pullRequestReviewEvent: { [RepoId]: PullRequestReviewEventState },
  pullRequestReviewCommentEvent: {
    [RepoId]: PullRequestReviewCommentEventState,
  },
  pushEvent: { [RepoId]: PushEventState },
}

type RepoName = string

type GroupedEvents = {|
  repoName: string,
  events: Events,
|}

const useTypes = [
  'CreateEvent',
  'DeleteEvent',
  'CommitCommentEvent',
  'IssueCommentEvent',
  'IssuesEvent',
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'PullRequestReviewCommentEvent',
  'PushEvent',
]
export type State = {
  gitHub: { [RepoName]: Events },
  entAcc: ResponseType[],
  isFetching: boolean,
  failed: boolean,
}

function arrangementEvents(
  prevEvents: ?Events,
  events: RepositoryEvent[]
): Events {
  const prevEventsCopy: Events = Object.assign({}, prevEvents)

  _.groupBy(events, event => event.type)

  events.forEach(event => {
    if (useTypes.includes(event.type)) {
      const repoEvent = Object.assign({}, event.payload, {
        id: event.id,
        repo: event.repo,
        read: false,
        type: _.camelCase(event.type),
      })
      if (!prevEventsCopy[_.camelCase(event.type)]) {
        prevEventsCopy[_.camelCase(event.type)] = {}
      }
      if (!prevEventsCopy[_.camelCase(event.type)][repoEvent.id]) {
        prevEventsCopy[_.camelCase(event.type)][repoEvent.id] = repoEvent
      }
    }
  })

  return prevEventsCopy
}

const initialState = {
  gitHub: {},
  entAcc: [],
  response: [],
  isFetching: false,
  failed: false,
}

export default function reducer(
  state: State = initialState,
  action: ActionType,
) {
  switch (action.type) {
    case 'REPOSITORY_EVENT_START': {
      return Object.assign({}, state, { isFetching: true, failed: false })
    }
    case 'REPOSITORY_EVENT_SUCCESS': {
      const { gitHub } = action.payload
      const newState = Object.assign({}, state, {
        isFetching: false,
        failed: false,
        gitHub: state.gitHub,
        entAcc: action.payload.entAcc,
      })

      newState.gitHub[gitHub.repoName] = arrangementEvents(state.gitHub[gitHub.repoName], gitHub.events)

      return newState
    }
    case 'REPOSITORY_EVENT_FAILURE': {
      return Object.assign({}, state, { isFetching: false, failed: true })
    }
    case 'READ_REPOSITORY_EVENT': {
      const { repoName, eventType, eventId } = action.payload
      const newState = Object.assign({}, state)
      newState.gitHub[repoName][eventType][eventId].read = true
      return newState
    }
    case 'REMOVE_LISTENING_REPOSITORY': {
      const { repoOwnerName, repoName } = action.payload
      const newState = Object.assign({}, state)
      delete newState.gitHub[`${repoOwnerName}/${repoName}`]
      return newState
    }
    default:
      return state
  }
}

export const Actions = { fetchRepositoryEvents, readRepositoryEvent }
