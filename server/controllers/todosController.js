const { Todo } = require('../models');
const { WebError } = require('../middleware');

class TodosController {

    // Insert one Todo
    static insertOne(req, res, next) {
        const { title, description, status, due_date } = req.body;
        Todo.build(
            { title, description, status, due_date }
        )
            .save()
            .then(data => {
                res.status(201).json(data);
            })
            .catch(next)
    }

    // Get all the Todos
    static findAll(req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next)
    }

    // Get one Todo
    static findOne(req, res, next) {
        const { id } = req.params;
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
        const { id } = req.params,
            { title, description, status, due_date } = req.body;
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
        const { id } = req.params;
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
}

module.exports = TodosController;