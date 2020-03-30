const { Todo } = require('../models');

class TodosController {

    // Insert one Todo
    static insertOne(req, res) {
        try {
            const { title, description, status, due_date } = req.body;
            Todo.build(
                { title, description, status, due_date }
            )
                .save()
                .then(data => {
                    res.status(201).json(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json(err);
                    else
                        res.status(500).json(err);
                })
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json({ "message": err.message });
            else
                res.status(500).json(err);
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
                res.status(500).json(err);
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
                    if (err.message.includes('not found'))
                        res.status(404).json({ "message": err.message });
                    else
                        res.status(500).json(err);
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json({ "message": err.message });
            else
                res.status(500).json(err);
        }
    }

    // Update one Todo
    static updateOne(req, res) {
        try {
            const { id } = req.params,
                { title, description, status, due_date } = req.body;
            if (id === undefined)
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
                    if (err.message.includes('not found'))
                        res.status(404).json({ "message": err.message });
                    else
                        res.status(500).json(err);
                })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json(err);
                    else
                        throw err;
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json({ "message": err.message });
            else
                res.status(500).json(err);
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
                    res.status(404).json({ "message": err.message });
                })
                .then(data => {
                    res.status(200).json(destroyData);
                })
                .catch(err => {
                    throw err;
                });
        } catch (err) {
            if (err.message === 'Invalid parameters')
                res.status(422).json({ "message": err.message });
            else
                res.status(500).json(err);
        }
    }
}

module.exports = TodosController;