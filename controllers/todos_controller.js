const Todo = require('../models/Todo');

class TodosController {

    // Insert one Todo
    static insertOne(req, res) {
        try {
            const { title, description, status, due_date } = req.body;
            Todo.build(
                { title, description, status, due_date },
                { plain: true }
            )
                .save()
                .then(data => {
                    res.status(201).json(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json(err);
                    else
                        throw err;
                })
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Get all the Todos
    static findAll(req, res) {
        Todo.findAll({
            plain: true
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    // Get one Todo
    static findOne(req, res) {
        try {
            const { id } = req.params;
            Todo.findOne({
                where: { id },
                plain: true
            })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(404).json(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Update one Todo
    static updateOne(req, res) {
        try {
            const { id } = req.params,
                { title, description, status, due_date } = req.body;
            Todo.update(
                { title, description, status, due_date },
                {
                    where: { id },
                    returning: true,
                    plain: true
                }
            )
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError')
                        res.status(400).json(err);
                    else
                        res.status(404).json(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Delete one Todo
    static delete(req, res) {
        try {
            const { id } = req.params;
            Todo.destroy({
                where: { id },
                returning: true,
                plain: true
            })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(404).json(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = TodosController;