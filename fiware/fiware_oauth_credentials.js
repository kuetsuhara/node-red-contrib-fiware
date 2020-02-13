module.exports = function (RED) {
  'use strict'
  function FiwareOauthCredentialsNode(config) {
    RED.nodes.createNode(this, config)
    this.server = config.server
    this.authport = config.authport
    this.keyrockport = config.keyrockport
    this.authcode = config.authcode
    if (this.credentials) {
      this.id = this.credentials.id
      this.password = this.credentials.password
    }
  }
  RED.nodes.registerType('fiware-oauth-credentials', FiwareOauthCredentialsNode, {
    credentials: {
      id: { type: 'text' },
      password: { type: 'password' }
    }
  })
}