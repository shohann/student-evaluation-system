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

        console.log(newUser);
        res.send('success');

    } catch(error) {
        console.log(error);
        res.send(error);

    }
}

module.exports.renderSignUp = async (req, res) => {
    try {
        console.log("OK");
        res.render('signup');
    } catch(error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.signIn = async (req, res) => {
    try {
        console.log(req.body.email)
        const validUser = await user.findUnique({
            where: {
              email: req.body.email,
            },
        });

        console.log(validUser)

        res.send('dashboard')
    } catch(error) {
        console.log(error);
        res.send(error);
    }
}
 
module.exports.renderSignIn = async (req, res) => {
    try {
        res.render('signin');
    } catch(error) {
        console.log(error);
        res.send(error);
    }
}