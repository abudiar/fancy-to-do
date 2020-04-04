const { Todo } = require('../models');
const { WebError } = require('../middleware');
const axios = require('axios');
const queryString = require('query-string');

class TodoController {

    // Insert one Todo
    static insertOne(req, res, next) {
        const {
            decodedToken: { UserId },
            body: { title, description, status, due_date },
            headers: { groupid }
        } = req;
        const todoInfo = { title, description, status, due_date, UserId }
        if (groupid)
            todoInfo['GroupId'] = groupid;
        Todo.build(todoInfo)
            .save()
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    // Get all the Todos
    static findAll(req, res, next) {
        const {
            decodedToken: { UserId },
            headers: { groupid }
        } = req;
        const where = {};
        if (!groupid)
            where['GroupId'] = groupid;
        else
            where['UserId'] = UserId;

        Todo.findAll({
            where, order: [
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
            params: { id }, query: { translateFrom = 'id', translateTo = 'en' }
        } = req;
        const original = {},
            translated = {},
            matches = {},
            client = 'tw-ob',
            dt = 't';
        let todoData;
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
                todoData = data;
                const { title } = todoData;
                // const translateParams = {
                //     client,
                //     sl: translateFrom,
                //     tl: translateTo,
                //     dt,
                //     q: title
                // }
                // const stringified = queryString.stringify(translateParams);
                // // console.log(stringified);
                // return axios({
                //     method: 'get',
                //     url: 'https://translate.googleapis.com/translate_a/single?' + stringified,
                // })
                original['title'] = title;
                const translateParams = {
                    q: title,
                    langpair: `${translateFrom}|${translateTo}`,
                }
                const stringified = queryString.stringify(translateParams);
                // console.log(stringified);
                return axios({
                    method: 'get',
                    url: 'https://api.mymemory.translated.net/get?' + stringified,
                })
            })
            .then(function (response) {
                console.log(response)
                translated['title'] = response.data.responseData.translatedText;
                matches['title'] = response.data.responseData.matches;

                const { description } = todoData;
                // const translateParams = {
                //     client,
                //     sl: translateFrom,
                //     tl: translateTo,
                //     dt,
                //     q: description
                // }
                // const stringified = queryString.stringify(translateParams);
                // return axios({
                //     method: 'get',
                //     url: 'https://translate.googleapis.com/translate_a/single?' + stringified,
                // })
                original['description'] = description;
                const translateParams = {
                    q: description,
                    langpair: `${translateFrom}|${translateTo}`,
                }
                const stringified = queryString.stringify(translateParams);
                // console.log(stringified);
                return axios({
                    method: 'get',
                    url: 'https://api.mymemory.translated.net/get?' + stringified,
                })
            })
            .then(function (response) {
                translated['description'] = response.data.responseData.translatedText;
                matches['description'] = response.data.responseData.matches;

                const { status } = todoData;
                // const translateParams = {
                //     client,
                //     sl: translateFrom,
                //     tl: translateTo,
                //     dt,
                //     q: status
                // }
                // const stringified = queryString.stringify(translateParams);
                // return axios({
                //     method: 'get',
                //     url: 'https://translate.googleapis.com/translate_a/single?' + stringified,
                // })
                original['status'] = status;
                const translateParams = {
                    q: status,
                    langpair: `${translateFrom}|${translateTo}`,
                }
                const stringified = queryString.stringify(translateParams);
                // console.log(stringified);
                return axios({
                    method: 'get',
                    url: 'https://api.mymemory.translated.net/get?' + stringified,
                })
            })
            .then(function (response) {
                translated['status'] = response.data.responseData.translatedText;
                matches['status'] = response.data.responseData.matches;

                const result = {
                    parameters: {
                        translateFrom: translateFrom,
                        translateTo: translateTo,
                    },
                    original,
                    translated,
                    matches
                }
                res.status(200).json(result);
            })
            .catch(next)
    }
}

module.exports = TodoController;