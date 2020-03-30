const router = require('express').Router();
const Controller = require('../controllers/index_controller');

// Methods
router.get(`/`, Controller.getAll);

module.exports = router;