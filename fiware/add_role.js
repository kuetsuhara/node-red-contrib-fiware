const fClient = require('./fiware_client.js')

module.exports = function (RED) {
  'use strict'
  function AddRoleNode(config) {
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
          cl.addRole(token, config.appid, config.orgid, config.roleid, function (err, success) {
            if (err) {
              console.log("addRole error!", err)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              msg.payload = err
              node.send(msg)
            } else {
              node.status({})
              msg.payload = success
              node.send(msg)
            }
          })
        }
      })
    })
    node.on('close', function () {
      node.status({})
    })
  }
  RED.nodes.registerType('AddRole', AddRoleNode)
}