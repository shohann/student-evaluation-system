const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;


module.exports = prisma;
module.exports.Membership = prisma.group_membership;


// const Membership = prisma.group_membership;
// module.exports  = Membership 
// module.exports = group_membership;