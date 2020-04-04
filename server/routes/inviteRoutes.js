const router = require('express').Router();
const { InviteController } = require('../controllers');
const { Auth } = require('../middleware');

// Methods
router.get(`/`, Auth.authenticate, InviteController.findAll);
router.post(`/`, Auth.authenticate, Auth.authorizeAdmin, InviteController.insertOne);
router.get(`/group`, Auth.authenticate, Auth.authorizeGroup, InviteController.findAll);
router.delete(`/:id`, Auth.authenticate, Auth.authorizeInvite, InviteController.deleteOne);

module.exports = router;