const { Invite, User } = require('../models');
const { WebError } = require('../middleware');

class InviteController {

    // Insert one Invite
    static insertOne(req, res, next) {
        const {
            decodedToken: { UserId },
            headers: { groupid },
            body: { email }
        } = req;
        User.findOne({ where: { email } })
            .then(data => {
                if (data == null) {
                    throw new WebError({
                        name: 'UserNotFound',
                        status: 404,
                        message: 'User with email ' + email + ' not found.'
                    });
                }
                return Invite.create({ GroupId: groupid, UserId: data.dataValues.id })
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    // Get all the Invites
    static findAll(req, res, next) {
        const {
            decodedToken: { UserId },
            headers: { groupid }
        } = req;
        const where = {};
        if (groupid)
            where['GroupId'] = groupid;
        else
            where['UserId'] = UserId;

        Invite.findAll({
            where, order: [
                ['createdAt', 'desc']
            ]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

    // Delete one Invite
    static deleteOne(req, res, next) {
        const {
            // decodedToken: { UserId },
            params: { id }
        } = req;
        let destroyData;
        Invite.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Invite with id ' + id + ' not found.'
                    });
                destroyData = data;
                return Invite.destroy({
                    where: { id },
                    returning: true,
                    plain: true
                });
            })
            .then(data => {
                res.status(200).json(destroyData);
            })
            .catch(next);
    }
}

module.exports = InviteController;