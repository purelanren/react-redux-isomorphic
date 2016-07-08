import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import Immutable from 'immutable'

export default function configureStore(initialState = {}) {
  let finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(api),
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(createLogger({
      stateTransformer: (state) => {
        let newState = {}

        for (let i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS()
          } else {
            newState[i] = state[i]
          }
        }

        return newState
      }
    }))
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
