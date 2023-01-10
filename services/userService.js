const { User } = require('../utils/dbInit');

module.exports.createUser = async (email, name, password) => {
    return await User.create({
        data: {
            email: email,
            name: name,
            password: password

        }
    });
};

module.exports.fetchSingleUserByEmail = async (email) => {
    return await User.findUnique({
        where: {
            email: email
        }
    });
};

module.exports.fetchSingleByUserId = async (id) => {
    return await User.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            role: true
        }
    });
};