const router = require('express').Router();
const { TodoController } = require('../controllers');
const { Auth } = require('../middleware');

// Methods
router.post(`/`, Auth.authenticate, TodoController.insertOne);
router.get(`/`, Auth.authenticate, TodoController.findAll);
router.get(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodoController.findOne);
router.put(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodoController.updateOne);
router.delete(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodoController.deleteOne);
router.get(`/translate/:id`, Auth.authenticate, Auth.authorizeTodo, TodoController.translate);

module.exports = router;