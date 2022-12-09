const { GroupMembership } = require('../utils/dbInit');

const createTeacherMembership = async (teacherId, groupId) => {
    const newGroupMember = await GroupMembership.create({
        data: {
          groupId: groupId,
          userId: teacherId,
          creator: true
        },
    });

    console.log(newGroupMember);
};

createTeacherMembership('1ada1270-9bb2-4774-bc65-a568bf4448d2','25e5ed93-bf56-4a6d-b9e0-7aaef0c773de');


const createStudentMembership = async (teacherId, groupId) => {
    const newGroupMember = await GroupMembership.create({
        data: {
          groupId: groupId,
          userId: teacherId,
        },
    });

    console.log(newGroupMember);
};
