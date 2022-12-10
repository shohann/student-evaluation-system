const { GroupMembership } = require('../utils/dbInit');

// Gives the membership details of any user
module.exports.fetchAllGroupMembershipByMemberId = async (userId) => {
    return await GroupMembership.findMany({
        where: {
            userId: userId
        },
        include: {
            group: true
        }
    });

};

module.exports.createTeacherMembershipById = async (teacherId, groupId) => {
    return await GroupMembership.create({
        data: {
          groupId: groupId,
          userId: teacherId,
          creator: true
        },
    });
};

module.exports.deleteAllGroupMembershipByGroupId = async (groupId) => {
    return await GroupMembership.deleteMany({
        where: {
            groupId: groupId,
        }
    });
};

//////////////////////////////////////////////







const createStudentMembership = async (teacherId, groupId) => {
    const newGroupMember = await GroupMembership.create({
        data: {
          groupId: groupId,
          userId: teacherId,
        },
    });

    console.log(newGroupMember);
};

const fetchStudentMemberShip = async (userId, groupId) => [

];

const deleteSingleStudentMembership = async (userId, groupId) => {
    const deletedGroupMember = await GroupMembership.delete({
        where: {
            userId_groupId: {
                userId: userId,
                groupId: groupId
            }
            
        }
    });

    console.log(deletedGroupMember);
};

// deleteSingleStudentMembership('1ada1270-9bb2-4774-bc65-a568bf4448d2','25e5ed93-bf56-4a6d-b9e0-7aaef0c773de')

// const deleteAllGroupMembershipByGroupId = async (groupId) => {
//     const deletedMembers = await GroupMembership.deleteMany({
//         where: {
//             groupId: groupId,
//         }
//     });
//     console.log(deletedMembers)
// };

// composite key
// https://flaviocopes.com/prisma-multiple-fields-unique-key/
// @@id https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#get-the-user-record-with-firstname-of-alice-and-lastname-of-smith-id
// https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#id-1