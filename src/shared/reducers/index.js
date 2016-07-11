import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { API_SUCCESS } from '../middlewares/api'
import { GET_DESCRIPTION, SEND_MESSAGE, GET_LIST } from '../actions'

const description = (state = '', { type, api, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (api === GET_DESCRIPTION) {
        return response.description
      }
      return state

    default:
      return state
  }
}

const message = (state = '', { type, msg }) => {
  switch (type) {
    case SEND_MESSAGE:
      return msg

    default:
      return state
  }
}

const list = (state = [], { type, api, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (api === GET_LIST) {
        return response.list
      }
      return state

    default:
      return state
  }
}

export default combineReducers({
  routing,
  description,
  message,
  list
})
