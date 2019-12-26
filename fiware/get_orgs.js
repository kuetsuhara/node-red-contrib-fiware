module.exports = function (RED) {
  'use strict'
  function GetOrgsNode(config) {
    RED.nodes.createNode(this, config)
    var node = this

    node.on('input', function(){
      console.log("hoo")
    })

  }
  RED.nodes.registerType('GetOrgs', GetOrgsNode,)
}