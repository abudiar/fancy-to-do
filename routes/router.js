const router = require('express').Router();

router.use('/', require('./index'));
router.use('/todo', require('./todo'));

module.exports = router;