const request = require('request')
const TOKEN_PATH = '/auth/tokens'
const APPLICATIONS_PATH = '/applications'
const ORGANIZATIONS_PATH = '/organizations'
const ROLE_PATH = '/roles'
const ADD_ROLE_PATH = '/organization_roles/member'

module.exports = class FiwareClient {
  constructor(server, id, password) {
    this.server = server
    this.id = id
    this.password = password
  }

  getToken(callback) {
    var url = this.server + TOKEN_PATH
    var headers = {
      'Content-Type': 'application/json'
    }

    var data = {
      'name': this.id,
      'password': this.password
    }

    var option = {
      url: url,
      method: 'POST',
      headers: headers,
      json: data
    }

    request(option, function (error, response, body) {
      if (error) {
        return callback(error)
      }

      if (response.statusCode == 201) {
        var token = response.headers["x-subject-token"]
        return callback(null, token)
      }else{
        return callback(null, body)
      }
    })
  }

  getApplicationList(token, callback){
    var url = this.server + APPLICATIONS_PATH
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'GET',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }

  getOrganizationList(token, callback){
    var url = this.server + ORGANIZATIONS_PATH
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'GET',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }

  getRoleID(token, appId, callback){
    var url = this.server + APPLICATIONS_PATH + '/' + appId + ROLE_PATH
    console.log(url)
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'GET',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }

  addRole(token, appId, orgId, roleId, callback){
    var url = this.server + APPLICATIONS_PATH + '/' + appId + ORGANIZATIONS_PATH + '/' + orgId + ROLE_PATH + '/' + roleId + ADD_ROLE_PATH
    console.log(url)
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'POST',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }

  putRole(token, appId, orgId, roleId, callback){
    var url = this.server + APPLICATIONS_PATH + '/' + appId + ORGANIZATIONS_PATH + '/' + orgId + ROLE_PATH + '/' + roleId + ADD_ROLE_PATH
    console.log(url)
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'PUT',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }

  deleteRole(token, appId, orgId, roleId, callback){
    var url = this.server + APPLICATIONS_PATH + '/' + appId + ORGANIZATIONS_PATH + '/' + orgId + ROLE_PATH + '/' + roleId + ADD_ROLE_PATH
    console.log(url)
    var headers = {
      'Content-Type': 'application/json',
      'X-Auth-token': token
    }
    var option = {
      url: url,
      method: 'DELETE',
      json: true,
      headers: headers,
    }
    request(option, function (error, response, body) {
      if(error){
        return callback(error)
      }
      return callback(null, body)
    })
  }
}

/*
const client = require("./fiware_client.js")
var cl = new client("http://fiware-test.ht.sfc.keio.ac.jp:3005/v1", "alice-the-admin@test.com", "nedo2019")
cl.getToken(function(err, token){
  if(err){
    console.log("get token error!", err)
  }else{
    // GET applications
    console.log(token)
    cl.getApplicationList(token, function(err, success){
      if(err){
        console.log("get aplist error!", err)
        return err
      }else{
        console.log(success)
        return success
      }
    })
   
    // GET orgs
    cl.getOrganizationList(token, function(err, success){
      if(err){
        console.log("get orglist error!", err)
        return err
      }else{
        console.log(success)
        return success
      }
    })

    // GET Role ID
    cl.getRoleID(token, 'tutorial-dckr-site-0000-xpresswebapp' , function(err, success){
      if(err){
        console.log("get roleID error!", err)
        return err
      }else{
        console.log(success)
        return success
      }
    })

    // Add role
    cl.addRole(
      token, 
      'tutorial-dckr-site-0000-xpresswebapp', 
      '797f7c07-a436-4695-bbea-7a9243fbdce5', 
      'security-role-0000-0000-000000000000',
      function(err, success){
        console.log(err)
        console.log(success)
      })
  }
})

*/