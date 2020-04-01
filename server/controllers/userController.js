const { User } = require('../models');
const { WebError } = require('../middleware');
const { privateKey } = require('../constants');
const { Crypto } = require('../helpers');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;
        if (!password || !email || !name) throw new WebError({
            name: 'CredentialsNull',
            status: 400,
            message: 'Name, email and password are required!'
        })
        Crypto.hashPassword(password)
            .then((password) => {
                return User.create(
                    { name, email, password }
                )
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        if (!password || !email) throw new WebError({
            name: 'CredentialsNull',
            status: 400,
            message: 'Password and Email are required!'
        })
        let userData;
        User.findOne({ where: { email: email } })
            .then((user) => {
                if (!user)
                    throw new WebError({
                        name: 'WrongCredentials',
                        status: 400,
                        message: 'Wrong email and password combination!'
                    })
                userData = user;
                console.log(userData);
                return Crypto.comparePassword(password, user.password);
            })
            .then(success => {
                if (success) {
                    console.log(userData.id, userData.email, userData.name);
                    res.status(201).json({
                        accessToken: jwt.sign({
                            UserId: userData.id,
                            email: userData.email
                        }, privateKey),
                        name: userData.name
                    });
                }
                else
                    throw new WebError({
                        name: 'WrongCredentials',
                        status: 400,
                        message: 'Wrong email and password combination!'
                    })
            })
            .catch(next)
    }
}

module.exports = UserController;