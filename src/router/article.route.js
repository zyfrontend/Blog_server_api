const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { create } = require('../controller/article.controller')
const router = new Router({prefix: '/article'})

// 文章创建
router.post('/create', auth, create)
module.exports = router
