const jwt = require('jsonwebtoken')

const {
    createUser,
    getUerInfo,
    updateById,
} = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')

const { JWT_SECRET } = require('../config/config.default')

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const { username, password } = ctx.request.body

        // 2. 操作数据库
        try {
            const res = await createUser(username, password)
            // console.log(res)
            // 3. 返回结果
            ctx.body = {
                code: 200,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    username: res.username,
                },
            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body

        // 1. 获取用户信息(在token的payload中, 记录id, username, is_admin)
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            const { password, ...res } = await getUerInfo({ username })

            ctx.body = {
                code: 200,
                message: '用户登录成功',
                result: {
                    username,
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }

    async changePassword(ctx, next) {
        // 1. 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        // 2. 操作数据库
        if (await updateById({ id, password })) {
            ctx.body = {
                code: 200,
                message: '修改密码成功',
                result: '',
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: '',
            }
        }
        // 3. 返回结果
    }
}

module.exports = new UserController()
