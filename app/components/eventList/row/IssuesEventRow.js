// @flow

import React, { PureComponent } from 'react'
import { shell } from 'electron'
import { Card, IconArea, IconWrapper, ContentArea, ActionArea } from '../../styled/Card'
import { Box } from '../../styled/Box'
import { ExternalLink, XSquare, IssueOpened } from '../../styled/Icon'
import type { IssuesEventState } from '../../../types/IssuesEvent'
import { Actions as RepositoryEventActions } from '../../../reducers/repositoryEvent'

type Props = {
  actions: typeof RepositoryEventActions,
  event: IssuesEventState,
}

export default class IssuesEventRow extends PureComponent<Props> {

  opentLink() {
    shell.openExternal(this.props.event.issue.html_url)
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
          {event.repo.name} / Issue
        </Box>
        <Box>
          {event.issue.title} / {event.action}
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
              <IssueOpened size='20' />
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
