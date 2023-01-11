const { fetchAllGroupMembershipByMemberId, 
        createTeacherMembershipById,
        createStudentMembershipById } 
        = require('../services/groupMembershipService');
const { fetchSingleGroupDetailsById, 
        createGroup,
        deleteSingleGroupById } 
        = require('../services/groupService');

module.exports.renderGroups = async (req, res) => {
    try {
        const groups = await fetchAllGroupMembershipByMemberId(req.user.id);
        res.render('dashboard', { groups: groups });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.setGroup = async (req, res) => {
    const groupName = req.body.name;
    const userId = req.user.id;

    try {
        // create group
        // create creator membership only for teacher
        const group = await createGroup(groupName);
        const groupMembership = await createTeacherMembershipById(userId, group.id);

        res.status(201).json({
            groupName: group.name,
            creator: groupMembership.creator
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Internal Server Error'
        })
    }
};


module.exports.getGroup = async (req, res) => {
    // Get all members with given group id
    const groupId = req.params.groupId;
    try {   
        const group = await fetchSingleGroupDetailsById(groupId);
        res.send(group);
    } catch (error) {
        console.log(error)
        res.send(error)
    }

};

// userId is the current logged in user
module.exports.getGroups = async (req, res) => {
    const userId = req.user.id
    try {
        const groups = await fetchAllGroupMembershipByMemberId(userId);
        res.send(groups);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
};

module.exports.removeGroup = async (req, res) => {
    const groupId = req.params.groupId;
    
    try {
        const deletedGroup = await deleteSingleGroupById(groupId);
        res.send(deletedGroup)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
};

module.exports.setMember = async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;

    try {
        const studentMembership = await createStudentMembershipById(userId, groupId);
        // res.status(201).json(studentMembership);
        res.redirect('/api/show-groups');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};







