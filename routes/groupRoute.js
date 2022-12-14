const router = require('express').Router();
const { authorize } = require('../middlewares/authorize');
const { creator } = require('../middlewares/creator');
const { student } = require('../middlewares/student');
const { member } = require('../middlewares/member');
const { teacher } = require('../middlewares/teacher');
const { getGroups, 
        getGroup, 
        setGroup, 
        removeGroup,
        setMember } = require('../controllers/groupController');

router.route('/groups')
    .get(authorize,getGroups) // valid only for creator and student.student see memberships and techer see ownerships
    .post(authorize, teacher, setGroup)
    
router.route('/groups/:groupId')
    .get(authorize, member, getGroup) // get single group and its all members
    .post(authorize, student ,setMember)
    .delete(removeGroup) // delete single groups with its relations, and members -> complex

module.exports = router;

