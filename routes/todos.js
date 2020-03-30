const router = require('express').Router();
const Controller = require('../controllers/todos_controller');

// Methods
router.post(`/`, Controller.insertOne);
router.get(`/`, Controller.getAll);
router.get(`/:id`, Controller.getOne);
router.put(`/:id`, Controller.updateOne);
router.delete(`/:id`, Controller.deleteOne);

module.exports = router;