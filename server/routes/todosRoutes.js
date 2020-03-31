const router = require('express').Router();
const { TodosController } = require('../controllers');
const { Auth } = require('../middleware');

// Methods
router.post(`/`, Auth.authenticate, TodosController.insertOne);
router.get(`/`, Auth.authenticate, TodosController.findAll);
router.get(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodosController.findOne);
router.put(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodosController.updateOne);
router.delete(`/:id`, Auth.authenticate, Auth.authorizeTodo, TodosController.deleteOne);
router.get(`/translate/:id`, Auth.authenticate, Auth.authorizeTodo, TodosController.translate);

module.exports = router;