const router = require('express').Router();
const { SocialController } = require('../controllers');

// Methods
router.post(`/google`, SocialController.loginGoogle);

module.exports = router;