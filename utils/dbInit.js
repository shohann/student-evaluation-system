const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

module.exports = {
    User: prisma.user,
    Group: prisma.group,
    GroupMembership: prisma.group_membership,
    Quiz: prisma.quiz,
    Question: prisma.question,
    Option: prisma.option,
    Answer: prisma.answer,
    Result: prisma.result
};




//module.exports.Membership = prisma.group_membership; valid
// How the are working
// const Membership = prisma.group_membership; // invalid
// module.exports  = Membership 
// module.exports = group_membership;