const { Group, Admin, GroupUser, User } = require('../models');
const { WebError } = require('../middleware');

class GroupController {

    // Insert one Group
    static insertOne(req, res, next) {
        const {
            decodedToken: { UserId },
            body: { name }
        } = req;
        let groupData;
        Group.build({ name })
            .save()
            .then(data => {
                groupData = data;
                return Admin.create({ GroupId: data.dataValues.id, UserId })
            })
            .then(data => {
                res.status(201).json(groupData);
            })
            .catch(next)
    }

    // Get all the Groups
    static findAll(req, res, next) {
        const {
            decodedToken: { UserId }
        } = req;
        console.log('UserId', UserId)
        Group.findAll({
            order: [
                ['updatedAt', 'desc']
            ],
            include: [{ model: User, where: { id: UserId } }]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

    // Delete one Group
    static deleteOne(req, res, next) {
        const {
            // decodedToken: { UserId },
            params: { id }
        } = req;
        let destroyData;
        Group.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Group with id ' + id + ' not found.'
                    });
                destroyData = data;
                return Group.destroy({
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

    // Delete one Group
    static removeMember(req, res, next) {
        const {
            decodedToken: { UserId },
            params: { id, memberId },
            headers: { groupid }
        } = req;
        let destroyData;
        const where = { GroupId: groupid };
        if (memberId)
            where['UserId'] = memberId;
        else
            where['UserId'] = UserId;
        GroupUser.findOne({
            where
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'GroupUser with UserId ' + userId + ' and GroupId ' + groupid + 'not found.'
                    });
                destroyData = data;
                return GroupUser.destroy({
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

module.exports = GroupController;