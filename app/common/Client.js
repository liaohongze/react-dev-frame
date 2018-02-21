import fetch from 'isomorphic-fetch'

function login(cb) {
  return fetch(`http://api.redbon.cn/api/token`, {
    method: 'POST'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getCaptcha(cb) {
  return fetch(`http://auth.fgmc8.com/captcha`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function isCaptcha(value, code, cb) {
  return fetch(`http://auth.fgmc8.com/captcha/${value}?v=${code}`, {
    method: 'GET'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// function signup(values, token, cb) {
//   return fetch(`/api/account/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     },
//     body: JSON.stringify(values)
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb)
// }

// function refreshToken(token, cb) {
//   return fetch(`/api/refreshToken`, {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb)
// }

// 其它
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(response) // eslint-disable-line no-console
  console.log(error) // eslint-disable-line no-console
  throw error
}

function parseJSON(response) {
  return response.json()
}

// function parseTEXT(response) {
//   return response.text()
// }

const Client = {
  login,
  getCaptcha,
  isCaptcha
}

export default Client