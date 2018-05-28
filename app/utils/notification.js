// @flow

import Constants from '../constants'

const { remote } = require('electron')

type NotificationType = 'Issue' | 'Commit' | 'PullRequest' | 'Release'

export default {
  getNotificationIcon(type: NotificationType) {
    switch (type) {
      case 'Issue':
        return 'images/notifications/issue.png'
      case 'Commit':
        return 'images/notifications/commit.png'
      case 'PullRequest':
        return 'images/notifications/pull-request.png'
      case 'Release':
        return 'images/notifications/release.png'
      default:
        return 'images/notifications/gitify.png'
    }
  },

  generateGitHubAPIUrl(hostname: string) {
    const isEnterprise = hostname !== Constants.DEFAULT_AUTH_OPTIONS.hostname
    return isEnterprise
      ? `https://${hostname}/api/v3/`
      : `https://api.${hostname}/`
  },

  setup(notifications: Object[], notificationsCount: number, settings: Object) {
    // If there are no new notifications just stop there
    if (!notificationsCount) {
      return
    }

    if (settings.get('playSound')) {
      this.raiseSoundNotification()
    }

    if (settings.get('showNotifications')) {
      this.raiseNativeNotification(notifications, notificationsCount)
    }
  },

  raiseNativeNotification(notifications: Object[], count: number) {
    let title
    let body
    let icon
    let notification
    let notificationUrl

    if (count === 1) {
      const filledNotifications = notifications.find(obj => !obj.isEmpty())
      if (filledNotifications && filledNotifications.length > 0) {
        notification = filledNotifications.first()
        title = `Gitify - ${notification.getIn(['repository', 'full_name'])}`
        body = notification.getIn(['subject', 'title'])
        icon = this.getNotificationIcon(notification.getIn(['subject', 'type']))
        notificationUrl = notification.getIn(['subject', 'url'])
      }
    } else {
      title = 'Gitify'
      body = `You've got ${count} notifications.`
      icon = false
    }

    const nativeNotification = new remote.Notification(title, {
      body,
      icon,
      silent: true,
    })

    nativeNotification.onclick = () => {
      if (count === 1) {
        const appWindow = remote.getCurrentWindow()
        const url = this.generateGitHubWebUrl(notificationUrl)

        appWindow.hide()
        remote.openExternalLink(url)
      } else {
        remote.reOpenWindow()
      }
    }

    return nativeNotification
  },

  raiseSoundNotification() {
    const audio = new remote.Audio('sounds/digi.wav')
    audio.play()
  },
}
