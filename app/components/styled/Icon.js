// @flow

import styled from 'styled-components'
import { ExternalLink as EL, XSquare as X } from 'styled-icons/feather'
import { GitPullRequest as PR, IssueOpened as IO, Comment as C } from 'styled-icons/octicons'

export const ExternalLink = EL.extend`
  color: ${props => props.color || '#2d8c1a'};
  cursor: pointer;
  &:hover {
    stroke-width: 1.5;
  }
`

export const XSquare = X.extend`
  color: ${props => props.color || 'red' };
  cursor: pointer;
  &:hover {
    stroke-width: 1.5;
  }
`

export const IssueOpened = IO.extend`
  color: ${props => props.color || 'black'};
`

export const GitPullRequest = PR.extend`
  color: ${props => props.color || 'black'};
`

export const Comment = C.extend`
  color: ${props => props.color || 'black'};
`
