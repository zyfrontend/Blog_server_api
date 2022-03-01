const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Article = seq.define('blog_article', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "标题",
    },
    // 文章作者
    author_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "文章作者",
    },
    // 文章简介
    // 封面
    // 分类
    // 内容

})
// 强制同步数据库(创建数据表)
// Category.sync({ force: true })
module.exports = Article
