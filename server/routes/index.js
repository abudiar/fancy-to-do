const router = require('express').Router();

// Main index page
router.use('/', require('./indexRoutes'));

// Todos app page
router.use('/todos', require('./todoRoutes'));

// User page
router.use('/', require('./userRoutes'));

// Social login page
router.use('/social', require('./socialRoutes'));

// Group page
router.use('/groups', require('./groupRoutes'));

// Invite page
router.use('/invites', require('./inviteRoutes'));

// Setup 404 handler
router.use('*', (req, res) => {
    res.status(404).json('ERROR: Not Found');
})

module.exports = router;