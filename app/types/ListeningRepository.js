/* @flow */

export type ListeningRepository = {
  repoOwnerName: string,
  repoName: string,
  listeningEvent: {
    createEvent: boolean,
    deleteEvent: boolean,
    commitCommentEvent: boolean,
    issueCommentEvent: boolean,
    issuesEvent: boolean,
    pullRequestEvent: boolean,
    pullRequestReviewEvent: boolean,
    pullRequestReviewCommentEvent: boolean,
    pushEvent: boolean,
  },
}
