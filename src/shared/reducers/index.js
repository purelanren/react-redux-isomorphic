import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { API_SUCCESS } from '../middlewares/api'
import { GET_DESCRIPTION } from '../actions'

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

export default combineReducers({
  routing,
  description
})
