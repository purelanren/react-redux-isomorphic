import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

// containers
import Home from './containers/home'
import Description from './containers/description'

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="description" component={Description} />
  </Route>
)

export function getRouter (history) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  )
}
