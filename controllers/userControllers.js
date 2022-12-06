const { user } = require('../utils/dbInit');


module.exports.signUpPost = async (req, res) => {
    try {
        const newUser = await user.create({
            data: {
              name: req.body.name,
              email: req.body.email,
              name: req.body.password,
            },
        });
        res.redirect('success');

    } catch(error) {
        console.log(error);
        res.send(error);

    }
}

module.exports.signUpGet = async (req, res) => {
    try {
        res.render('signup');
    } catch(error) {
        console.log(error);
        res.send(error);
    }
}