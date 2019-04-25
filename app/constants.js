// @flow

require('dotenv').config({ path: __dirname + '/../.env' })

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;

export default {
  AUTH_SCOPE: ['user:email', 'notifications', 'repo'],

  DEFAULT_AUTH_OPTIONS: {
    hostname: 'github.com',
    clientId: clientId,
    clientSecret: clientSecret,
  },

  REPO_SLUG: 'h-michael/ghn',
  STORAGE_KEY: 'ghn-storage',
}
