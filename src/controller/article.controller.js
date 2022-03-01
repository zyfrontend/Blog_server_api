const { } = require('../service/article.service')
class ArticleController {
    async create (ctx) {
        const { title, author, introduction, category, cover, content, top, show } = ctx.request.body
        ctx.body = {
            title, author, introduction, category, cover, content, top, show
        }
        console.log(title, author, introduction, category, cover, content, top, show)
    }
}

module.exports = new ArticleController()
