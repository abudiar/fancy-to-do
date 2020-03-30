const router = require('express').Router();

// Main index page
router.use('/', require('./index'));

// Todos app page
router.use('/todos', require('./todos'));

// Setup 404 handler
router.use('*', (req, res) => {
    res.status(404).json('ERROR: Not Found');
})

module.exports = router;