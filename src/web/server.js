import koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import configureStore from '../shared/store/configureStore.server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import { routes } from '../shared/router'

const app = koa()
const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), {
  encoding: 'utf-8'
})
const store = configureStore({})

app.use(function *(next) {
  yield (callback) => {
    match({ routes, location: this.originalUrl }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        this.redirect(redirectLocation.pathname + redirectLocation.search, '/')
        return
      }

      console.log(renderProps)

      if (error || !renderProps) {
        callback(error)
        return
      }

      console.log('start render to string')

      try {
        const reactString = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        let template = html.replace('@reactString', reactString)
        this.type = 'text/html'
        this.body = template
        callback(null)
      } catch (e) {
        this.type = 'text/html'
        this.body = e.stack
        callback(e)
      }
    })
  }
  yield next
})

app.use(function* (next) {
  if (/^\/(css|img|js)\/.*$/.test(this.path)) {
    yield next
  }
})

app.use(serve(path.resolve(__dirname, '../../dist')))

app.listen(3000)

console.log('web server listening on port 3000')
