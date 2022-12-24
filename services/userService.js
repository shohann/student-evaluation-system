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

module.exports.fetchSingleUserById = async (email) => {
    //it uses the email not Id
    return await User.findUnique({
        where: {
            email: email
        }
    });
};