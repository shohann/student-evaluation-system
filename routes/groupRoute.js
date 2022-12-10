const router = require('express').Router();
const { getGroups, getGroup, setGroup, removeGroup } = require('../controllers/groupController')

router.route('/groups')
    .get(getGroups) // valid only for creator and student.student see memberships and techer see ownerships
    .post(setGroup)
    

router.route('/groups/:groupId')
    .get(getGroup) // get single group and its all members
    .delete(removeGroup) // delete single groups with its relations, and members

module.exports = router;

