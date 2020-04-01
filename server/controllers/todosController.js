const { Todo } = require('../models');
const { WebError } = require('../middleware');
const axios = require('axios');
const queryString = require('query-string');

class TodosController {

    // Insert one Todo
    static insertOne(req, res, next) {
        const {
            decodedToken: { UserId },
            body: { title, description, status, due_date }
        } = req;
        Todo.build(
            { title, description, status, due_date, UserId }
        )
            .save()
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    // Get all the Todos
    static findAll(req, res, next) {
        const { decodedToken: { UserId } } = req;
        Todo.findAll({
            where: { UserId }, order: [
                ['status', 'asc'],
                ['due_date', 'asc'],
                ['updatedAt', 'desc'],
            ]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

    // Get one Todo
    static findOne(req, res, next) {
        const {
            // decodedToken: { UserId },
            params: { id }
        } = req;
        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                res.status(200).json(data);
            })
            .catch(next)
    }

    // Update one Todo
    static updateOne(req, res, next) {
        const {
            // decodedToken: { UserId },
            params: { id },
            body: { title, description, status, due_date }
        } = req;
        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                return Todo.update(
                    { title, description, status, due_date },
                    {
                        where: { id },
                        returning: true
                    }
                );
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
    }

    // Delete one Todo
    static deleteOne(req, res, next) {
        const {
            // decodedToken: { UserId },
            params: { id }
        } = req;
        let destroyData;
        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                destroyData = data;
                return Todo.destroy({
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

    static translate(req, res, next) {
        const {
            params: { id }, query: { translateFrom = 'auto', translateTo = 'en' }
        } = req;
        Todo.findOne({
            where: { id }
        })
            .then(data => {
                if (data == null)
                    throw new WebError({
                        name: 'ItemNotFound',
                        status: 404,
                        message: 'Post with id ' + id + ' not found.'
                    });
                const { title, description, status } = data;
                const translateParams = {
                    client: 'gtx',
                    sl: translateFrom,
                    tl: translateTo,
                    dt: 't',
                    q: JSON.stringify({ title, description, status })
                }
                const stringified = queryString.stringify(translateParams);
                return axios({
                    method: 'get',
                    url: 'https://translate.googleapis.com/translate_a/single?' + stringified,
                })
            })
            .then(function (response) {
                try {
                    const original = JSON.parse(response.data[0][0][1]);
                    const translated = JSON.parse(response.data[0][0][0]);
                    const result = {
                        parameters: {
                            from: translateFrom,
                            to: translateTo
                        },
                        original,
                        translated
                    }
                    res.status(200).json(result);
                } catch (err) {
                    throw new WebError({
                        name: 'TranslationError',
                        status: 500,
                        message: err.message
                    });
                }
            })
            .catch(next)
    }
}

module.exports = TodosController;