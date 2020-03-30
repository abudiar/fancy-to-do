const router = require('express').Router();
const IndexController = require('../controllers/index_controller');

// Methods
router.get(`/`, IndexController.getIndex);

module.exports = router;