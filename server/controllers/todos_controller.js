const { Todo } = require('../models');

class TodosController {

    // Insert one Todo
    static insertOne(req, res) {
        try {
            const { title, description, status, due_date } = req.body;
            if (title === undefined || description === undefined || status === undefined || due_date === undefined)
                throw new Error('Invalid parameters');
            Todo.build(
                { title, description, status, due_date }
            )
                .save()
                .then(data => {
                    res.status(201).json(data);
                })
                .catch(err => {
                    if (err.message === 'Validation error')
                        res.status(400).json(err.message);
                    else
                        throw err;
                })
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json(err.message);
            else
                res.status(500).json(err.message);
        }
    }

    // Get all the Todos
    static findAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message);
            });
    }

    // Get one Todo
    static findOne(req, res) {
        try {
            const { id } = req.params;
            if (id === undefined)
                throw new Error('Invalid parameters');
            Todo.findOne({
                where: { id }
            })
                .then(data => {
                    console.log(data)
                    if (data == null)
                        throw new Error('Post with id ' + id + ' not found.');
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(404).json(err.message);
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json(err.message);
            else
                res.status(500).json(err.message);
        }
    }

    // Update one Todo
    static updateOne(req, res) {
        try {
            const { id } = req.params,
                { title, description, status, due_date } = req.body;
            if (id === undefined || title === undefined || description === undefined || status === undefined || due_date === undefined)
                throw new Error('Invalid parameters');
            Todo.findOne({
                where: { id }
            })
                .then(data => {
                    console.log(data)
                    if (data == null)
                        throw new Error('Post with id ' + id + ' not found.');
                    return Todo.update(
                        { title, description, status, due_date },
                        {
                            where: { id },
                            returning: true
                        }
                    );
                })
                .catch(err => {
                    res.status(404).json(err.message);
                })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json(err.message);
                    else
                        throw err;
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json(err.message);
            else
                res.status(500).json(err.message);
        }
    }

    // Delete one Todo
    static deleteOne(req, res) {
        try {
            const { id } = req.params;
            if (id === undefined)
                throw new Error('Invalid parameters');
            let destroyData;
            Todo.findOne({
                where: { id }
            })
                .then(data => {
                    if (data == null)
                        throw new Error('Post with id ' + id + ' not found.');
                    destroyData = data;
                    return Todo.destroy({
                        where: { id },
                        returning: true,
                        plain: true
                    });
                })
                .catch(err => {
                    res.status(404).json(err.message);
                })
                .then(data => {
                    res.status(200).json(destroyData);
                })
                .catch(err => {
                    throw err;
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json(err.message);
            else
                res.status(500).json(err.message);
        }
    }
}

module.exports = TodosController;