const fClient = require('./fiware_client.js')

module.exports = function (RED) {
  'use strict'
  function GetAppsNode(config) {
    RED.nodes.createNode(this, config)
    this.login = RED.nodes.getNode(config.login)
    console.log(this.login)
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

    console.log("=====================")
    console.log(this.login.id)
    console.log(this.login.password)
    console.log(this.login.server)


    var node = this

    node.on('input', function(msg){
      var cl = new fClient(
        "http://fiware-test.ht.sfc.keio.ac.jp:3005/v1", 
        "alice-the-admin@test.com", 
        "nedo2019")
      cl.getToken(function(err, token){
        node.status({ fill: 'green', shape: 'dot', text: 'request...' })
        if(err){
          node.status({ fill: 'red', shape: 'dot', text: 'error' })
          console.log("get token error!", err)
        }else{
          // GET applications
          cl.getApplicationList(token, function(err, success){
            if(err){
              console.log("get aplist error!", err)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              msg.payload = err
              node.send(msg)
            }else{
              // console.log(success)
              node.status({})
              msg.payload = success
              node.send(msg)
            }
          })
        }
      })
    })

    node.on('close', function() {
      node.status({})
    })


  }
  RED.nodes.registerType('GetApps', GetAppsNode,)
}