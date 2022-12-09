const { User } = require('../utils/dbInit');

const createUser = async (email, name) => {
    const newUser = await User.create({
        data: {
            email: email,
            name: name
        }
    });

    console.log(newUser)
};

createUser('NAME', 'name@mail.com');