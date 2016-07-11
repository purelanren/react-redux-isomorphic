import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

// layout
import Layout from './components/layout'

// containers
import Play from './containers/play'

export const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Play} />
  </Route>
)

export function getRouter (history) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  )
}
