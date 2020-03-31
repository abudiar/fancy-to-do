const { User } = require('../models');
const { WebError } = require('../middleware');
const { privateKey } = require('../constants');
const { Crypto } = require('../helpers');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const { username, password } = req.body;
        if (!password || !username) throw new WebError({
            name: 'PasswordOrUsernameNull',
            status: 400,
            message: 'Password and Username are required!'
        })
        Crypto.hashPassword(password)
            .then((password) => {
                return User.create(
                    { username, password }
                )
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { username, password } = req.body;
        if (!password || !username) throw new WebError({
            name: 'PasswordOrUsernameNull',
            status: 400,
            message: 'Password and Username are required!'
        })
        let userData;
        User.findOne({ where: { username: username } })
            .then((user) => {
                if (!user)
                    throw new WebError({
                        name: 'WrongCredentials',
                        status: 400,
                        message: 'Wrong username and password combination!'
                    })
                userData = user;
                return Crypto.comparePassword(password, user.password);
            })
            .then(success => {
                if (success)
                    res.status(201).json({
                        accessToken: jwt.sign({
                            UserId: userData.id,
                            username: userData.username
                        }, privateKey)
                    });
                else
                    throw new WebError({
                        name: 'WrongCredentials',
                        status: 400,
                        message: 'Wrong username and password combination!'
                    })
            })
            .catch(next)
    }
}

module.exports = UserController;