const foClient = require('./fiware_oauth_client.js')

module.exports = function (RED) {
  'use strict'
  function GetEntitiesNode(config) {
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
      console.log("login!", this.login)
      var cl = new foClient(
        this.login.server,
        this.login.authport,
        this.login.keyrockport,
        this.login.authcode,
        this.login.id,
        this.login.password)

      cl.getToken(function (err, token) {
        if (err) {
          node.status({ fill: 'red', shape: 'dot', text: 'get token error' })
          console.log("get token error!", err)
        } else {
          cl.getEntities(token, config.eid, config.option, config.query, config.etype, function (err, success) {
            if (err) {
              console.log("get entity error!", err)
              node.status({ fill: 'red', shape: 'dot', text: 'get entity error' })
              msg.payload = err
              node.send(msg)
            }
            else {
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
  RED.nodes.registerType('GetEntities', GetEntitiesNode)
}