const bcrypt = require('bcryptjs')
const jwt_s = require('../config/default.json')
const jwt = require('jsonwebtoken')
const {User} = require("../models/association");

//Auth
const auth = async (req, res) => {
    try {
        const {email, password, name, sername, phone, login} = req.body


        if ((name || sername || phone) && login !== 'login') {

            const isEmail = await User.findOne({where: {email: `${email}`}})
            const isPhone = await User.findOne({where: {phone: `${phone}`}})

            if (isEmail === null) {
                console.log('Ok!');
            } else {
                console.log('not Ok!');
                return res.json({
                    message: 'email занят'
                })
            }

            if (isPhone === null) {
                console.log('Ok!');
            } else {
                console.log('not Ok!');
                return res.json({
                    message: 'телефон занят'
                })
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            console.log('создание юзера')
            try {
                const newUser = await User.create({
                    name: `${name}`,
                    sername: `${sername}`,
                    email: `${email}`,
                    password: `${hash}`,
                    phone: `${phone}`
                })
                console.log('конец создания юзера')

                const token = jwt.sign(
                    {
                        id: newUser.id
                    }, jwt_s.jwt_secret,
                    {expiresIn: '30d'}
                )

                res.json({
                    newUser,
                    token,
                    message: 'Регистрация есть'
                })


            } catch (e) {
                console.log(e, 'ошибка при создании')
            }


        } else {

            try {
                const user = await User.findOne({where: {email: `${email}`}})

                if (user === null) {
                    return res.json({
                        message: 'такого юзера не существует'
                    })
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password)

                if (!isPasswordCorrect) {
                    return res.json({
                        message: 'неверный пароль'
                    })
                }

                const token = jwt.sign({
                        id: user.id
                    }, jwt_s.jwt_secret,
                    {expiresIn: '30d'}
                )
                i = user.id

                res.json({
                    token, user, message: 'Log In'
                })
            } catch (e) {
                console.log(e)
            }

        }


    } catch (e) {
        res.json({message: e + 'Ошибка при создании пользователя'})
    }
}


//Me
const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId)
        if (!user) {
            return res.json({
                message: 'такого юзера не существует'
            })
        }

        const token = jwt.sign({
                id: user.id
            }, jwt_s.jwt_secret,
            {expiresIn: '30d'}
        )

        res.json({
            token,
            user
        })

    } catch (e) {
        res.json({message: 'нет доступа'})
    }
}

module.exports = {
    auth,
    getMe
}


