const Category = require('../model/category.model')
class CategoryService {
    async createCategory(name, author_id){
        const res = await Category.create({name, author_id})
        return res.dataValues
    }

    async getCategoryInfo ({id, name, author_id}){
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        name && Object.assign(whereOpt, { name })
        author_id && Object.assign(whereOpt, { author_id })

        const res = await Category.findOne({
            attributes: ['id', 'name', 'author_id'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
    async updateCategory({id, name}){
        const whereOpt = { id }
        const newCategoryName = {}
        name && Object.assign(newCategoryName, { name })
        const res = await Category.update(
            newCategoryName,
            {where: whereOpt}
        )
        return res[0] > 0 ? true : false
    }
    async deleteCategory({id}){
        const whereOpt = { id }
        await Category.destroy({
            where: whereOpt
        })
    }
    async getCategoryList(author_id){
        return await Category.findAll();
    }
}

module.exports = new CategoryService()
