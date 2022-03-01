const Router = require('koa-router')
const { create, revise, remove, list } = require('../controller/category.controller')
const { auth } = require('../middleware/auth.middleware')
const { verifyCategory, verifyAuthor } = require('../middleware/category.middleware')
const router = new Router({prefix: '/category'})

// 分类创建
router.post('/create', auth, verifyCategory, create)
// 分类删除
router.delete('/delete/:id', auth, remove)
// 分类修改
router.patch('/revise', auth, verifyAuthor, revise)
// 分类列表
router.get('/list', list)
module.exports = router
