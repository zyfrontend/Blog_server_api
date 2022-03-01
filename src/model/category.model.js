const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Category = seq.define('blog_category', {
    // 分类名字
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        comment: "分类名，唯一",
    },
    // 文章作者
    author_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        default: "2",
        comment: "文章作者",
    },
})
// 强制同步数据库(创建数据表)
// Category.sync({ force: true })
module.exports = Category
