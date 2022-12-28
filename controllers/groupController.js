const { fetchAllGroupMembershipByMemberId, 
        createTeacherMembershipById,
        createStudentMembershipById,
        deleteAllGroupMembershipByGroupId,
        deleteSingleStudentMembershipById } 
        = require('../services/groupMembershipService');
const { fetchSingleGroupDetailsById, 
        createGroup,
        deleteSingleGroupById } 
        = require('../services/groupService');

module.exports.renderGroups = async (req, res) => {
    const userId = 'b3109dd4-8cda-411f-be38-3ee566aff2e9';
    try {
        // const groups = ['dsndsn', 'sdshds', 'abc', 'usdjsjs', 'sjdjsk']
        const groups = await fetchAllGroupMembershipByMemberId(req.user.id);
        // groups.push('Working');
        res.render('dashboard', { groups: groups });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.renderQuiz = async (req, res) => {
    try {
        res.render('quiz');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

///////////////////////////

module.exports.setGroup = async (req, res) => {
     // ensure current logged in user is the creator of the group
    // Only a teacher will set a group
    // createTeacherMembership('1ada1270-9bb2-4774-bc65-a568bf4448d2','25e5ed93-bf56-4a6d-b9e0-7aaef0c773de' );
    // const mockUserId = '1ada1270-9bb2-4774-bc65-a568bf4448d2';
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
    // ensure current logged in user is the creator of the group
    // fisrt all the memberships/other relationships associated to that group 
    // then delete the group
    const groupId = req.params.groupId;
    try {
        const deletedMembers = await deleteAllGroupMembershipByGroupId(groupId);
        const deletedGroup = await deleteSingleGroupById(groupId);
        // del res, result, quiz for it
        res.send({
            deletedMembers,
            deletedGroup
        })
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
        res.status(201).json(studentMembership);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.removeMember = async (req, res) => {
    const groupId = req.params.groupId;
    const studentId = req.params.studentId;
    const userId = req.user.id;

    try {
        const deletedMember = await deleteSingleGroupById(studentId, groupId);
    } catch(error) {
        console.log(error);
        res.send(error);
    }
};





