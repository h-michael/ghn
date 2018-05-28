// @flow

import React, { PureComponent } from 'react'
import { Button, Input, Checkbox, Modal } from 'semantic-ui-react'
import { values, map } from 'ramda'
import { Box } from '../../styled/Box'
import type { State as AuthState } from '../../../reducers/auth'
import type { State as SettingState } from '../../../reducers/setting'
import type { ListeningRepository } from '../../../types/ListeningRepository'
import { Actions as AuthActions } from '../../../reducers/auth'
import { Actions as SettingActions } from '../../../reducers/setting'

type Props = {
  auth: AuthState,
  setting: SettingState,
  authActions: typeof AuthActions,
  settingActions: typeof SettingActions,
}

type State = {
  isModalOpen: boolean,
  repository: ListeningRepository,
}

export default class IndexUI extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isModalOpen: false,
      repository: {
        repoOwnerName: '',
        repoName: '',
        listeningEvent: {
          createEvent: false,
          deleteEvent: false,
          commitCommentEvent: false,
          issueCommentEvent: false,
          issuesEvent: false,
          pullRequestEvent: false,
          pullRequestReviewEvent: false,
          pullRequestReviewCommentEvent: false,
          pushEvent: false,
        },
      },
    }
  }

  renderRepositories() {
    return (
      values(this.props.setting.listeningRepositories)
        .filter(repo => repo)
        .map(repo => (
          <Box key={`${repo.repoOwnerName}/${repo.repoName}`}>
            <Box display='inline-block'>
              {`${repo.repoOwnerName}/${repo.repoName}`}
            </Box>
            <Box display='inline-block'>
              <Button
                basic
                size='mini'
                color='red'
                content='Remove'
                onClick={() => {
                  this.props.settingActions.removeListeningRepository(repo.repoOwnerName, repo.repoName)
                }}
              />
            </Box>
          </Box>
        )
      )
    )
  }

  setRepoOwnerName(repoOwnerName: string) {
    const repository = Object.assign({}, this.state.repository)
    repository.repoOwnerName = repoOwnerName
    this.setState({ repository })
  }

  setRepoName(repoName: string) {
    const repository = Object.assign({}, this.state.repository)
    repository.repoName = repoName
    this.setState({ repository })
  }

  setRepoEvent(eventName: string, value: boolean) {
    const repository = Object.assign({}, this.state.repository)
    repository.listeningEvent[eventName] = value
    this.setState({ repository })
  }

  checkBoxSeed(): { eventName: string, label: string, checked: boolean }[] {
    const event = this.state.repository.listeningEvent
    return [
      { eventName: 'issuesEvent', label: 'Issue Event', checked: event.issuesEvent },
      { eventName: 'issueCommentEvent', label: 'Issue Comment Event', checked: event.issueCommentEvent },
      { eventName: 'commitCommentEvent', label: 'Commit Comment Event', checked: event.commitCommentEvent },
      { eventName: 'pullRequestEvent', label: 'Pull Request Event', checked: event.pullRequestEvent },
      { eventName: 'pullRequestReviewEvent', label: 'Pull Request Review Event', checked: event.pullRequestReviewEvent },
      { eventName: 'pullRequestReviewCommentEvent', label: 'Pull Request Review Comment Event', checked: event.pullRequestReviewCommentEvent },
      { eventName: 'pushEvent', label: 'Push Event', checked: event.pushEvent },
      { eventName: 'createEvent', label: 'Create Event', checked: event.createEvent },
      { eventName: 'deleteEvent', label: 'Delete Event', checked: event.deleteEvent },
    ]
  }

  buildCheckBox(params: { eventName: string, label: string, checked: boolean }) {
    return (
      <Box key={`${params.eventName}-checkbox`}>
        <Checkbox
          label={{ children: params.label }}
          onChange={(e: SyntheticEvent<*>, data: Object) => { this.setRepoEvent(params.eventName, data.checked) }}
          checked={params.checked}
          name={params.eventName}
        />
      </Box>
    )
  }

  renderCheckBox() {
    return map(this.buildCheckBox.bind(this), this.checkBoxSeed())
  }

  render() {
    const event = this.state.repository.listeningEvent
    return (
      <Box>
        <Box>
          Setting
        </Box>
        <Box>
          <Button
            onClick={() => { this.setState({ isModalOpen: true }) }}
          >
            Add
          </Button>
        </Box>
        <Modal size='small' dimmer='blurring' open={this.state.isModalOpen} onClose={() => { this.setState({ isModalOpen: false }) }}>
          <Modal.Header>
            Add Repository
          </Modal.Header>
          <Modal.Content>
            <Box>
              <Input
                placeholder='Repository Owner Name'
                value={this.state.repository.repoOwnerName}
                onChange={(e: SyntheticEvent<*>, data: Object) => { this.setRepoOwnerName(data.value) }}
              />
              <Input
                placeholder='Repository Name'
                value={this.state.repository.repoName}
                onChange={(e: SyntheticEvent<*>, data: Object) => { this.setRepoName(data.value) }}
              />
            </Box>
            <Box>
              {this.renderCheckBox()}
            </Box>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' content='Cancel' onClick={() => { this.setState({ isModalOpen: false }) }} />
            <Button
              basic
              color='green'
              icon='checkmark'
              labelPosition='right'
              content='Add'
              onClick={() => {
                this.props.settingActions.addListeningRepository(this.state.repository)
                this.setState({ isModalOpen: false })
              }}
            />
          </Modal.Actions>
        </Modal>
        {this.renderRepositories()}
      </Box>
    )
  }
}
