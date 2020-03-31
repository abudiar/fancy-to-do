const router = require('express').Router();
const { TodosController } = require('../controllers');

// Methods
router.post(`/`, TodosController.insertOne);
router.get(`/`, TodosController.findAll);
router.get(`/:id`, TodosController.findOne);
router.put(`/:id`, TodosController.updateOne);
router.delete(`/:id`, TodosController.deleteOne);

module.exports = router;