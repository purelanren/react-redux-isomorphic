import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import rootReducer from '../reducers'

export default function configureStore(initialState = {}) {
  let finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(api),
    applyMiddleware(routerMiddleware(browserHistory))
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
