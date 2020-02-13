const request = require('request')
const TOKEN_PATH = '/oauth2/token'
const ENTITIES_PATH = '/v2/entities'

module.exports = class FiwareOauthClient {
  constructor(server, auth_port, keyrock_port, auth_code, id, password) {
    this.server = server
    this.auth_port = auth_port
    this.keyrock_port = keyrock_port
    this.auth_code = auth_code
    this.id = id
    this.password = password
  }

  getToken(callback) {
    var url = this.server + ':' + this.auth_port + TOKEN_PATH
    var headers = {
      'Accept': 'application/json',
      'Authorization': this.auth_code,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    var data = 'username=' + this.id + '&password=' + this.password + '&grant_type=password'

    var option = {
      url: url,
      method: 'POST',
      headers: headers,
      json: true,
      agentOptions: {
        rejectUnauthorized: false,
      },
      form: data
    }

    request(option, function (error, response, body) {
      if (error) {
        console.log('error', error)
        callback(error)
      }
      if (response.statusCode == 200) {
        console.log('body', body)
        callback(null, body['access_token'])
      } else {
        console.log('body', body)
        callback(body)
      }
    })
  }
  /*
    createEntities(token, json_data, callback) {
      var url = this.server + ':' + this.keyrock_port + ENTITIES_PATH
      var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'fiware-service': '102',
        'fiware-servicepath': '/',
        'X-Auth-Token': token
      }
  
      var option = {
        url: url,
        method: 'POST',
        headers: headers,
        json: json_data,
        agentOptions: {
          rejectUnauthorized: false,
        }
      }
  
      console.log(option)
      request(option, function (error, response, body) {
        console.log("status code", response.statusCode)
        if (error) {
          console.log('error', error)
          callback(error)
        }
        if (response.statusCode == 201) {
          // return "success", because body is undefined
          callback(null, "success")
        } else {
          console.log('body', body)
          callback(body, null)
        }
      })
    }
  
  
    putEntities(token, target, json_data, callback) {
      var url = this.server + ':' + this.keyrock_port + ENTITIES_PATH + '/' + target + '/attrs'
      var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'fiware-service': '102',
        'fiware-servicepath': '/',
        'X-Auth-Token': token
      }
  
      var option = {
        url: url,
        method: 'PUT',
        headers: headers,
        json: json_data,
        agentOptions: {
          rejectUnauthorized: false,
        }
      }
  
      request(option, function (error, response, body) {
        console.log("status code", response.statusCode)
        if (error) {
          console.log('error', error)
          callback(error)
        }
        if (response.statusCode == 204) {
          // return "success", because body is undefined
          callback(null, "success")
        } else {
          console.log('body', body)
          callback(body, null)
        }
      })
  
    }
    */
}

// const client = require('./fiware_oauth_client.js')
// var cl = new client('https://202.149.16.157', '54406', '44306', 'usr102@dpc-japan.org', 'uF8JXaNr')
// cl.getToken(function (err, token) {
//   if (err) {
//     console.log('get token error!', err)
//   } else {
//     cl.createEntities(token, function (err, success) {
//       if (err) {
//         console.log('Error createEntities', err)
//       } else {
//         console.log('success!', success)
//       }
//     })
//   }
// })
