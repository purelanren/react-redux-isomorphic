const koa = require('koa')
const cors = require('koa-cors')
const koaRouter = require('koa-router')
const config = require('../config')

const app = koa()

// cors
app.use(cors({
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}))

// router
const router = koaRouter()
app.use(router.routes())
router.get('/description', function*() {
  this.body = { description: 'koa-react-redux' }
})

app.listen(config.api.port)
