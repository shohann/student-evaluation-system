const { GroupMembership, Group } = require('../utils/dbInit');

module.exports.fetchGroupById = async (groupId) => {
    return await Group.findMany({
        where: {
            id: groupId,
        }
    });
};

module.exports.createGroup = async (groupName) => {
    return  await Group.create({
        data: {
          name: groupName,
        },
    });
};

module.exports.deleteSingleGroupById = async (groupId) => {
    return  await Group.delete({
        where: {
            id: groupId
        }
    });
};
















///////////////////////////////////////////

// const fetchAllGroupsByMemberId = async (studentId) => {
//     const groups = await GroupMembership.findMany({
//         where: {
//           userId: studentId
//         },
//         include: {
//             group: true,
//         },
//     })

//     console.log(groups);
// }

// getAllGroupsByMemberId('0a69fa4f-b428-41ab-ac20-ce7b06035af3')







//////////////////////////////////////////

const fetchMemberById = async (studentId, groupId) => {
    const member = await GroupMembership.findFirst({
        where: {
            AND: 
                {
                userId: {
                    equals: studentId,
                },

                groupId: {
                    equals: groupId,
                },
            },
        },
      });

      console.log(member)
};

// getMemberById('8591c963-3774-4d82-a0e1-ba9bc2d06b91', '82e6c2c3-d60a-4cfc-8b20-0889b2c05919');


const fetchGroupMembers = async (groupId) => {
    const members = await GroupMembership.findMany({
        where: {
          groupId: groupId
        },
        include: {
            user: true,
        },
      })

      console.log(members)
};

// getGroupMembers('82e6c2c3-d60a-4cfc-8b20-0889b2c05919');



// const fetchAllGroupsByMemberId = async (studentId) => {
//     const groups = await GroupMembership.findMany({
//         where: {
//           userId: studentId
//         },
//         include: {
//             group: true,
//         },
//     })

//     console.log(groups);
// }

// getAllGroupsByMemberId('0a69fa4f-b428-41ab-ac20-ce7b06035af3')










// sid && gid
// Its not work for findUniquw karon id tai to unique jinish ,,r seta sudhu e ekta,,amra ekhane where clouse besi field dia filter korle to hobe na
// const users = await prisma.user.findMany({
//     where: {
//       OR: [

// Because of the return keyword this gave me a 'Promise pending'.But it works fine with console.log
// I ran with node file.js -> not act as server here
// const createGroup = async (groupName) => {
//     const newGroup = await Group.create({
//         data: {
//           name: groupName,
//         },
//     });
//     return newGroup
// };