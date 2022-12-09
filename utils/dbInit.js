const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

module.exports = {
    User: prisma.user,
    Group: prisma.group,
    GroupMembership: prisma.group_membership
}




//module.exports.Membership = prisma.group_membership; valid
// How the are working
// const Membership = prisma.group_membership; // invalid
// module.exports  = Membership 
// module.exports = group_membership;