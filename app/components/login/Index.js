// @flow

import React, { PureComponent } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Actions } from '../../reducers/auth'

const { ipcRenderer } = require('electron')

type Props = {
  actions: typeof Actions,
  isEitherLoggedIn: boolean,
}

export default class IndexUI extends PureComponent<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isEitherLoggedIn) {
      ipcRenderer.send('reopen-window')
    }
  }

  render() {
    if (this.props.isEitherLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div className="container-fluid main-container login">
        <div className="desc">
          GitHub Notifications<br />in your menu bar.
        </div>
        <button
          className="btn btn-block btn-login"
          onClick={() => this.props.actions.authGithub()}
        >
          <i className="fa fa-github mr-2" /> Login to GitHub
        </button>

        <Link to="/enterpriselogin" className="btn btn-block btn-login mt-3">
          <i className="fa fa-github mr-2" /> Login to GitHub Enterprise
        </Link>
      </div>
    )
  }
}
