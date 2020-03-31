const router = require('express').Router();
const { IndexController } = require('../controllers');

// Methods
router.get(`/`, IndexController.getIndex);

module.exports = router;