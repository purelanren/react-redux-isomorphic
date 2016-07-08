import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../shared/store'
import { getRouter } from '../shared/router'

import '../shared/common/public.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const router = getRouter(history)

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root')
)
