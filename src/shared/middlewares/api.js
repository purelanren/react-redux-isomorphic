import 'isomorphic-fetch'

const API_ROOT = __API__BASE__

function callApi (api, request) {
  const fullUrl = API_ROOT + api
  let option = {
    credentials: 'include'
  }

  if (request) {
    option = {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }
  }

  return fetch(fullUrl, option)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({ json, response })
      }
      return json
    })
}

export const CALL_API = Symbol('Call API')
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_FAILURE = 'API_FAILURE'

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { api, request } = callAPI

  if (typeof api === 'function') {
    api = api(store.getState())
  }

  if (typeof api !== 'string') {
    throw new Error('Specify a string api URL.')
  }

  next({
    api,
    type: API_REQUEST,
    request
  })

  return callApi(api).then(
    response => {
      next({
        api,
        type: API_SUCCESS,
        response
      })
    },
    result => {
      next({
        api,
        type: API_FAILURE,
        result
      })
    }
  )
}
