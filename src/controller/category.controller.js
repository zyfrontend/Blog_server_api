const { createCategory, updateCategory, deleteCategory, getCategoryList } = require('../service/category.service')
class CategoryController {
    async create(ctx){
        const { name } = ctx.request.body
        const { id } = ctx.state.user
        try {
            const res = await createCategory(name, id)
            ctx.body = {
                code: 200,
                message: '分类创建成功',
                result: {
                    id: res.id,
                    categoryname: res.name
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
    async revise(ctx){
        const { id, name } = ctx.request.body
        // 查询分类名

        try {
            const res = await updateCategory({id, name})
            ctx.body = {
                code: 200,
                message: '分类修改成功',
                result: ''
            }
        } catch (err) {
            console.log(err);
        }
    }
    async remove(ctx) {
        const { id } = ctx.request.params
        try {
            const res = await deleteCategory({id})
            ctx.body = {
                code: 200,
                message: '分类删除成功',
                result: ''
            }
        } catch (err) {
            console.log(err);
        }
    }
    async list(ctx) {
        try {
            const res = await getCategoryList()
            ctx.body = {
                code: 200,
                message: '分类列表获取成功',
                result: res
            }
        } catch (err) {
            console.log(err);
        }

    }
}

module.exports = new CategoryController()
