import koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import fs from 'fs'
import request from 'sync-request'
import proxy from 'koa-proxy'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import config from '../../config'
import configureStore from '../shared/store/configureStore.server'
import { routes } from '../shared/router'
import { loadOnServer } from '../shared/common/serverRender'

const app = koa()

app.use(proxy({
  host: 'http://www.mocky.io/',
  match: /^\/v2\//
}))

app.use(serve(path.resolve(__dirname, '../../dist')))

const store = configureStore({})
let html
if (__PRODUCTION__) {
  html = fs.readFileSync(path.resolve(__dirname, '../../dist/template/index.html'), {
    encoding: 'utf-8'
  })
} else {
  const res = request('GET', `${config.static.base}index.html`)
  html = res.getBody('utf8')
}

if (__PRODUCTION__ && __ISOMORPHIC__) {
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
        const reactString = ReactDOM.renderToStaticMarkup(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        const initialSate = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`

        let template = html.replace('@reactString', reactString)
        template = template.replace('<script type="text/html"></script>', initialSate)
        this.type = 'text/html'
        this.body = template
      }).catch(err => {
        console.error(err)
      })
    })

    yield beforeRender
  })
} else {
  app.use(function* () {
    const template = html.replace('@reactString', '')
    this.type = 'text/html'
    this.body = template
  })
}

app.listen(config.web.port)

console.log(' 🌎  Visit %s', config.web.base)
