const fClient = require('./fiware_client.js')

module.exports = function (RED) {
  'use strict'
  function PatchUserEnabledNode(config) {
    RED.nodes.createNode(this, config)

    this.login = RED.nodes.getNode(config.login)
    if (!this.login) {
      console.log('not login ??')
      node.status({
        fill: 'red',
        shape: 'dot',
        text: 'Credential error'
      })
      node.error('No credentials specified')
      return
    }

    var node = this

    node.on('input', function (msg) {

      console.log("input!! payload", msg.payload)

      var cl = new fClient(
        this.login.server,
        this.login.id,
        this.login.password)

      cl.getToken(function (err, token) {
        node.status({ fill: 'green', shape: 'dot', text: 'request...' })
        if (err) {
          node.status({ fill: 'red', shape: 'dot', text: 'error' })
          console.log("get token error!", err)
        } else {
          // GET applications
          var users = []

          for (let index = 0; index < msg.payload.users.length; index++) {
            console.log(msg.payload.users[index])
            users.push(cl.patchUserEnabled(node.login.server, token, msg.payload.users[index]))

          }

          Promise.all(users).then(function (values) {
            console.log("VALUES", values);
          }).catch(function () {
            console.log("error");
          })
        }
      })
    })
    node.on('close', function () {
      node.status({})
    })
  }
  RED.nodes.registerType('PatchUserEnabled', PatchUserEnabledNode)
}