/* @flow */

import type { ListeningRepository } from '../types/ListeningRepository'

type ADD_LISTENING_REPOSITORY = {
  type: 'ADD_LISTENING_REPOSITORY',
  payload: { listeningRepository: ListeningRepository },
}
function addListeningRepository(listeningRepository: ListeningRepository) {
  return (dispatch: Dispatch<*>) => {
    dispatch({
      type: 'ADD_LISTENING_REPOSITORY',
      payload: { listeningRepository }
    })
  }
}

type REMOVE_LISTENING_REPOSITORY = {
  type: 'REMOVE_LISTENING_REPOSITORY',
  payload: { repoOwnerName: string, repoName: string },
}
function removeListeningRepository(repoOwnerName: string, repoName: string) {
  return (dispatch: Dispatch<*>) => {
    dispatch({
      type: 'REMOVE_LISTENING_REPOSITORY',
      payload: { repoOwnerName, repoName }
    })
  }
}

type ActionType = ADD_LISTENING_REPOSITORY | REMOVE_LISTENING_REPOSITORY

type RepoOwnerAndRepoName = string

export type State = {|
  listeningRepositories: { [RepoOwnerAndRepoName]: ListeningRepository },
|}

const initialState = {
  listeningRepositories: {},
}

export default function reducer(
  state: State = initialState,
  action: ActionType,
) {
  switch (action.type) {
    case 'ADD_LISTENING_REPOSITORY': {
      const { repoOwnerName, repoName } = action.payload.listeningRepository
      const newState = Object.assign({}, state)
      newState.listeningRepositories[`${repoOwnerName}/${repoName}`] =
        action.payload.listeningRepository
      return newState
    }
    case 'REMOVE_LISTENING_REPOSITORY': {
      const { repoOwnerName, repoName } = action.payload
      const newState = Object.assign({}, state)
      delete newState.listeningRepositories[`${repoOwnerName}/${repoName}`]
      return newState
    }
    default: {
      return state
    }
  }
}

export const Actions = { addListeningRepository, removeListeningRepository }
