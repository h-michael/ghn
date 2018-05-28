// @flow

import React, { PureComponent } from 'react'
import { shell } from 'electron'
import { Card, IconArea, IconWrapper, ContentArea, ActionArea } from '../../styled/Card'
import { Box } from '../../styled/Box'
import { ExternalLink, XSquare, GitPullRequest } from '../../styled/Icon'
import type { PushEventState } from '../../../types/PushEvent'
import { Actions as RepositoryEventActions } from '../../../reducers/repositoryEvent'

type Props = {
  actions: typeof RepositoryEventActions,
  event: PushEventState,
}

export default class PushEventRow extends PureComponent<Props> {
  opentLink() {
    // shell.openExternal(this.props.event)
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
          {event.repo.name} / Push
        </Box>
      </Box>
    )
  }

  render() {
    const { event, actions } = this.props
    return (
      <Card tabIndex='0'>
        <IconArea/>
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
