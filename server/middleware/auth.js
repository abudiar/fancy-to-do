const jwt = require('jsonwebtoken');
const { privateKey } = require('../constants');
const WebError = require('../middleware/webError');
const { Todo } = require('../models');

class Auth {
    static isValidToken(token) {
        jwt.verify(token, privateKey, function (err, decoded) {
            if (err)
                throw err;
            else if (decoded.UserId && decoded.name)
                return decoded;
            else
                throw new WebError({
                    name: 'TokenInvalid',
                    status: 401,
                    message: 'Token is not valid!'
                });
            // // console.log(decoded)
        });
    }

    static authenticate(req, res, next) {
        // // console.log({ WebError } = require('../middleware'))
        const { accesstoken } = req.headers;
        // // console.log(req.headers)
        if (!accesstoken)
            throw new WebError({
                name: 'TokenNull',
                status: 400,
                message: 'Token is missing.'
            })
        try {
            jwt.verify(accesstoken, privateKey, function (err, decoded) {
                if (err)
                    throw err;
                else {
                    req['decodedToken'] = decoded;
                    next();
                }
            });
        }
        catch (err) {
            next(err)
        }
    }

    static authorizeTodo(req, res, next) {
        const { decodedToken: { UserId }, params: { id } } = req;

        Todo.findOne({ where: { id } })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                if (UserId == data.UserId)
                    next();
                else
                    throw new WebError({
                        name: 'AuthorizationError',
                        status: 401,
                        message: 'You do not have the required permissions!'
                    });
            })
            .catch(next);
    }
}

module.exports = Auth;