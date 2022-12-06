const { user } = require('../utils/dbInit');


module.exports.signUp = async (req, res) => {
    try {
        const newUser = await user.create({
            data: {
              name: req.body.name,
              email: req.body.email,
              name: req.body.password,
            },
        });

        res.send(newUser);

    } catch(error) {
        console.log(error);
        res.send(error);

    }
}