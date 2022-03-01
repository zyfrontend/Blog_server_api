const { getCategoryInfo } = require('../service/category.service')
const { categoryRepetition, categoryCreateError, hasNotAdminPermission, categoryDoesNotExist } = require('../constant/err.type')

// 重复？
const verifyCategory = async (ctx, next) => {
    const  { name } = ctx.request.body
    try {
        const res = await getCategoryInfo({ name })
        if(res){
            console.log('分类已经存在', { name })
            ctx.app.emit('error', categoryRepetition, ctx)
            return
        }
    } catch (err) {
        console.log('获取分类信息错误', err);
        ctx.app.emit('error', categoryCreateError, ctx)
        return
    }
    await next()
}

// 是否有权限修改或者删除
const verifyAuthor = async (ctx, next) => {
    const { id } = ctx.request.body
    const { is_admin } = ctx.state.user
    const currentUserId = ctx.state.user.id
    // 查询分类是否存在
    const res = await getCategoryInfo({ id })
    if(res){
        if(Number(res.author_id) === currentUserId){
            await next()
        } else if (is_admin){
            await next()
        } else {
            console.log('没有权限');
            ctx.app.emit('error', hasNotAdminPermission, ctx)
            return
        }
    } else {
        // 分类不存在
        console.log('分类不存在');
        ctx.app.emit('error', categoryDoesNotExist, ctx)
        return
    }
    // res.author_id 作者
    // currentUserId 当前要修改的用户id

}

module.exports = {
    verifyCategory,
    verifyAuthor
}
