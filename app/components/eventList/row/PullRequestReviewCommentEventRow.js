// @flow

import React, { PureComponent } from 'react'
import { shell } from 'electron'
import { Card, IconArea, IconWrapper, ContentArea, ActionArea } from '../../styled/Card'
import { Box } from '../../styled/Box'
import { ExternalLink, XSquare, GitPullRequest, Comment } from '../../styled/Icon'
import type { PullRequestReviewCommentEventState } from '../../../types/PullRequestReviewCommentEvent'
import { Actions as RepositoryEventActions } from '../../../reducers/repositoryEvent'

type Props = {
  actions: typeof RepositoryEventActions,
  event: PullRequestReviewCommentEventState,
}

export default class PullRequestReviewCommentEventRow extends PureComponent<
  Props,
> {
  opentLink() {
    shell.openExternal(this.props.event.comment.html_url)
  }

  renderCard() {
    const { event, actions } = this.props
    return (
      <Box
        onClick={() => {
          this.opentLink()
          actions.readRepositoryEvent(event.repo.name, event.type, event.id)
        }}
        role="presentation"
      >
        <Box>
          {event.repo.name} / Pull Request Review Comment
        </Box>
        <Box>
          {event.pull_request.title}
        </Box>
      </Box>
    )
  }

  render() {
    const { event, actions } = this.props
    return (
      <Card tabIndex='0'>
        <IconArea>
          <IconWrapper>
            <Box>
              <GitPullRequest size='20' />
            </Box>
            <Box>
              <Comment size='20' />
            </Box>
          </IconWrapper>
        </IconArea>
        <ContentArea>
          {this.renderCard()}
        </ContentArea>
        <ActionArea>
          <Box onClick={() => { this.opentLink() }} role="presentation" >
            <ExternalLink size='20' />
          </Box>
          <Box
            onClick={() => { actions.readRepositoryEvent(event.repo.name, event.type, event.id) }}
            role="presentation"
          >
            <XSquare size='20' />
          </Box>
        </ActionArea>
      </Card>
    )
  }
}
