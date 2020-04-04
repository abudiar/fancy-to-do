const router = require('express').Router();
const { GroupController } = require('../controllers');
const { Auth } = require('../middleware');

// Methods
router.post(`/`, Auth.authenticate, GroupController.insertOne);
router.get(`/`, Auth.authenticate, GroupController.findAll);
router.delete(`/:id`, Auth.authenticate, Auth.authorizeAdmin, GroupController.deleteOne);
router.delete(`/:id/removeMember/:memberId`, Auth.authenticate, Auth.authorizeAdmin, GroupController.removeMember);
router.delete(`/:id/removeMember`, Auth.authenticate, Auth.authorizeGroup, GroupController.removeMember);

module.exports = router;