import koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import config from '../../config'
import configureStore from '../shared/store/configureStore.server'
import { routes } from '../shared/router'
import { loadOnServer } from '../shared/common/serverRender'

const app = koa()
const html = fs.readFileSync(path.resolve(__dirname, '../../dist/template/index.html'), {
  encoding: 'utf-8'
})
const store = configureStore({})

app.use(serve(path.resolve(__dirname, '../../dist')))

app.use(function *() {
  let beforeRender = () => {}
  match({ routes, location: this.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      this.redirect(redirectLocation.pathname + redirectLocation.search, '/')
      return
    }

    if (error) {
      this.throw(error, 500)
    }

    if (!renderProps) {
      this.throw('not found', 404)
    }

    beforeRender = loadOnServer(store.dispatch, renderProps.components).then(() => {
      const reactString = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )

      const initialSate = `window.INITIAL_STATE = ${JSON.stringify(store.getState())}`

      let template = html.replace('@reactString', reactString)
      template = template.replace('@initialSate', initialSate)
      this.type = 'text/html'
      this.body = template
    }).catch(err => {
      console.error(err)
    })
  })

  yield beforeRender
})

app.listen(config.web.port)

console.log('web server listening on port %s', config.web.port)
