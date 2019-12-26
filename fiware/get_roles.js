module.exports = function (RED) {
  'use strict'
  function GetRolesNode(config) {
    RED.nodes.createNode(this, config)
    var node = this

    node.on('input', function(){
      console.log("hoo")
    })

  }
  RED.nodes.registerType('GetRoles', GetRolesNode,)
}