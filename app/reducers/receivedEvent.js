/* @flow */

import _ from 'lodash'
import axios from 'axios'
import { parse } from 'url'
import ReceivedEventAPI from '../api_utils/ReceivedEventAPI'
import type { ReceivedEvent } from '../types/ReceivedEvent'
import type {
  CreateEvent,
  DeleteEvent,
  CommitCommentEvent,
  IssueCommentEvent,
  IssuesEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  PullRequestReviewCommentEvent,
  PushEvent,
} from '../types/EventIndex'

type ResponseType = {
  gitHub: ReceivedEvent[],
  entAcc: {
    hostname: string,
    receivedEvents: ReceivedEvent[],
  }[],
}

type RECEIVED_EVENT_START = { type: 'RECEIVED_EVENT_START' }
type RECEIVED_EVENT_SUCCESS = {
  type: 'RECEIVED_EVENT_SUCCESS',
  payload: ResponseType,
}
type RECEIVED_EVENT_FAILURE = {
  type: 'RECEIVED_EVENT_FAILURE',
  payload: Object,
}
function fetchReceivedEvents(token: string) {
  return (dispatch: Dispatch<*>) => {
    dispatch({ type: 'RECEIVED_EVENT_START' })
    const isGitHubLoggedIn = token !== null
    const promise = ReceivedEventAPI.fetchReceivedEvents(token, 'h-michael')
    if (promise) {
      promise
        .then(
          axios.spread((gitHubReceivedEvents, ...entAccReceivedEvents) => {
            const entAcc = entAccReceivedEvents.map(accReceivedEvents => {
              const { hostname } = parse(accReceivedEvents.config.url)

              return {
                hostname,
                receivedEvents: accReceivedEvents.data,
              }
            })

            let gitHub = []
            if (isGitHubLoggedIn) {
              gitHub = gitHubReceivedEvents.data
            }

            dispatch({
              type: 'RECEIVED_EVENT_SUCCESS',
              payload: { gitHub, entAcc },
            })
          }),
        )
        .catch(error => {
          dispatch({ type: 'RECEIVED_EVENT_FAILURE', payload: error.response })
        })
    } else {
      dispatch({
        type: 'RECEIVED_EVENT_FAILURE',
        payload: { gitHub: [], entAcc: [] },
      })
    }
  }
}

type ActionType =
  | RECEIVED_EVENT_START
  | RECEIVED_EVENT_SUCCESS
  | RECEIVED_EVENT_FAILURE

type RepoId = number

type GroupedEvents = {|
  createEvent: { [RepoId]: CreateEvent },
  deleteEvent: { [RepoId]: DeleteEvent },
  commitCommentEvent: { [RepoId]: CommitCommentEvent },
  issueCommentEvent: { [RepoId]: IssueCommentEvent },
  issuesEvent: { [RepoId]: IssuesEvent },
  pullRequestEvent: { [RepoId]: PullRequestEvent },
  pullRequestReviewEvent: { [RepoId]: PullRequestReviewEvent },
  pullRequestReviewCommentEvent: { [RepoId]: PullRequestReviewCommentEvent },
  pushEvent: { [RepoId]: PushEvent },
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
  gitHub: GroupedEvents,
  entAcc: ResponseType[],
  isFetching: boolean,
  failed: boolean,
}

const initialState = {
  gitHub: {
    createEvent: {},
    deleteEvent: {},
    commitCommentEvent: {},
    issueCommentEvent: {},
    issuesEvent: {},
    pullRequestEvent: {},
    pullRequestReviewEvent: {},
    pullRequestReviewCommentEvent: {},
    pushEvent: {},
  },
  entAcc: [],
  response: [],
  isFetching: false,
  failed: false,
}

function arrangementEvents(events: ReceivedEvent[]): GroupedEvents {
  const tempObject = {
    createEvent: [],
    deleteEvent: [],
    commitCommentEvent: [],
    issueCommentEvent: [],
    issuesEvent: [],
    pullRequestEvent: [],
    pullRequestReviewEvent: [],
    pullRequestReviewCommentEvent: [],
    pushEvent: [],
  }
  _.groupBy(events, event => event.type)

  events.forEach(event => {
    if (useTypes.includes(event.type)) {
      const repoEvent = Object.assign({}, event.payload, { id: event.id })
      tempObject[_.camelCase(event.type)].push(repoEvent)
    }
  })

  const grouped = {
    createEvent: {},
    deleteEvent: {},
    commitCommentEvent: {},
    issueCommentEvent: {},
    issuesEvent: {},
    pullRequestEvent: {},
    pullRequestReviewEvent: {},
    pullRequestReviewCommentEvent: {},
    pushEvent: {},
  }

  grouped.createEvent = _.groupBy(tempObject.createEvent, e => e.repo.id)
  grouped.deleteEvent = _.groupBy(tempObject.deleteEvent, e => e.repo.id)
  grouped.commitCommentEvent = _.groupBy(
    tempObject.commitCommentEvent,
    e => e.repo.id,
  )
  grouped.issuesEvent = _.groupBy(tempObject.issuesEvent, e => e.repo.id)
  grouped.issueCommentEvent = _.groupBy(
    tempObject.issueCommentEvent,
    e => e.repo.id,
  )
  grouped.pullRequestEvent = _.groupBy(
    tempObject.pullRequestEvent,
    e => e.repo.id,
  )
  grouped.pullRequestReviewEvent = _.groupBy(
    tempObject.pullRequestReviewEvent,
    e => e.repo.id,
  )
  grouped.pullRequestReviewCommentEvent = _.groupBy(
    tempObject.pullRequestReviewCommentEvent,
    e => e.repo.id,
  )
  grouped.pushEvent = _.groupBy(tempObject.pushEvent, e => e.repo.id)

  return grouped
}

export default function reducer(
  state: State = initialState,
  action: ActionType,
) {
  switch (action.type) {
    case 'RECEIVED_EVENT_START':
      return Object.assign({}, state, { isFetching: true, failed: false })
    case 'RECEIVED_EVENT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        failed: false,
        gitHub: arrangementEvents(action.payload.gitHub),
        entAcc: action.payload.entAcc,
      })
    case 'RECEIVED_EVENT_FAILURE':
      return Object.assign({}, state, { isFetching: false, failed: true })
    default:
      return state
  }
}

export const Actions = { fetchReceivedEvents }
