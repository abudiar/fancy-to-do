const jwt = require('jsonwebtoken');
const { privateKey } = require('../constants');
const WebError = require('../middleware/webError');
const { Todo, Group, User, Admin, Invite } = require('../models');

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
        const { decodedToken: { UserId }, params: { id }, headers: { groupid } } = req;
        Todo.findOne({ where: { id } })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                if (groupid) {
                    this.authorizeGroup(req, res, (err) => {
                        if (err)
                            next(err);
                        else {
                            next();
                        }
                    })
                }
                else {
                    if (UserId == data.UserId)
                        next();
                    else
                        throw new WebError({
                            name: 'AuthorizationError',
                            status: 401,
                            message: 'You do not have the required permissions!'
                        });
                }
            })
            .catch(next);
    }

    static authorizeGroup(req, res, next) {
        const { decodedToken: { UserId }, headers: { groupid } } = req;

        Group.findOne({ where: { id: groupid }, include: [{ model: User }] })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Group with id ' + groupid + ' not found.'
                    });

                const groupUserIds = [];
                for (let i in data.Users)
                    groupUserIds.push(data.Users[i].dataValues.id)

                if (groupUserIds.includes(UserId))
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

    static authorizeAdmin(req, res, next) {
        const { decodedToken: { UserId }, headers: { groupid } } = req;

        Group.findOne({ where: { id: groupid }, include: [{ model: Admin }] })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Group with id ' + groupid + ' not found.'
                    });

                const adminUserIds = [];
                for (let i in data.Admins)
                    adminUserIds.push(data.Admins[i].dataValues.id)

                if (adminUserIds.includes(UserId))
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

    static authorizeInvite(req, res, next) {
        const { decodedToken: { UserId }, headers: { groupid } } = req;

        Group.findOne({ where: { id: groupid }, include: [{ model: Invite }, { model: Admin }] })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Group with id ' + groupid + ' not found.'
                    });

                const inviteUserIds = [];
                const adminUserIds = [];
                for (let i in data.Admins)
                    adminUserIds.push(data.Admins[i].dataValues.id)
                for (let i in data.Invites)
                    inviteUserIds.push(data.Invites[i].dataValues.id)

                if (inviteUserIds.includes(UserId) || adminUserIds.includes(UserId))
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