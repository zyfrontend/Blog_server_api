const Koa = require('koa');
const koaBody = require('koa-body')
const cors = require('koa2-cors');
const router = require('../router')
const errHandler = require('./errHandler')

const app = new Koa();
// 跨域
app.use(cors());

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods());
// 统一的错误处理
app.on('error', errHandler)

module.exports = app;
