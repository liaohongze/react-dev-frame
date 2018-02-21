const URI = '/'

function callApi(endpoint, authenticated) {
  let token = localStorage.getItem('token') || null
  let options = {}

  if (authenticated) {
    if (token) {
      options = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw new Error('No token saved!')
    }
  }

  return fetch(URI + endpoint, options)
    .then(response => {
      response.text()
        .then(text => ({
          text, response
        }))
    }).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
      return text
    }).catch(err => {
      console.log(err)
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [successType, errorType] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated)
    .then(response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    }))
}