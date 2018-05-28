// @flow

export type Event =
  | 'CheckRunEvent'
  | 'CheckSuiteEvent'
  | 'CommitCommentEvent'
  | 'CreateEvent'
  | 'DeleteEvent'
  | 'DeploymentEvent'
  | 'DeploymentStatusEvent'
  | 'DownloadEvent'
  | 'FollowEvent'
  | 'ForkEvent'
  | 'ForkApplyEvent'
  | 'GistEvent'
  | 'GollumEvent'
  | 'InstallationEvent'
  | 'InstallationRepositoriesEvent'
  | 'IssueCommentEvent'
  | 'IssuesEvent'
  | 'LabelEvent'
  | 'MarketplacePurchaseEvent'
  | 'MemberEvent'
  | 'MembershipEvent'
  | 'MilestoneEvent'
  | 'OrganizationEvent'
  | 'OrgBlockEvent'
  | 'PageBuildEvent'
  | 'ProjectCardEvent'
  | 'ProjectColumnEvent'
  | 'ProjectEvent'
  | 'PublicEvent'
  | 'PullRequestEvent'
  | 'PullRequestReviewEvent'
  | 'PullRequestReviewCommentEvent'
  | 'PushEvent'
  | 'ReleaseEvent'
  | 'RepositoryEvent'
  | 'RepositoryVulnerabilityAlertEvent'
  | 'StatusEvent'
  | 'TeamEvent'
  | 'TeamAddEvent'
  | 'WatchEvent'

export type UseType =
  | 'CreateEvent'
  | 'DeleteEvent'
  | 'CommitCommentEvent'
  | 'IssueCommentEvent'
  | 'IssuesEvent'
  | 'PullRequestEvent'
  | 'PullRequestReviewEvent'
  | 'PullRequestReviewCommentEvent'
  | 'PushEvent'
