// @flow

import React, { PureComponent } from 'react'
import { Settings } from 'styled-icons/feather'
import { Timeline } from 'styled-icons/material'
import { Link } from 'react-router-dom'
import { Box } from '../styled/Box'
import type { State as AuthState } from '../../reducers/auth'
import { Actions } from '../../reducers/auth'

type Props = {
  auth: AuthState,
  authActions: typeof Actions,
}

export default class IndexUI extends PureComponent<Props> {
  render() {
    return (
      <Box>
        <Box>
          <Link to="/">
            <Timeline size='32' title='timeline' />
          </Link>
        </Box>
        <Box>
          <Link to="/setting">
            <Settings size='32' title='setting' />
          </Link>
        </Box>
      </Box>
    )
  }
}
