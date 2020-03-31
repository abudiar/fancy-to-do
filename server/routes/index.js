const router = require('express').Router();

// Main index page
router.use('/', require('./indexRoutes'));

// Todos app page
router.use('/todos', require('./todosRoutes'));

// User page
router.use('/', require('./userRoutes'));

// User page
router.use('/test', require('../middleware/auth').authenticate);

// Setup 404 handler
router.use('*', (req, res) => {
    res.status(404).json('ERROR: Not Found');
})

module.exports = router;