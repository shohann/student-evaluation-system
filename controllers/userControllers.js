const { createUser, fetchSingleUserById } = require('../services/userService');
const { genSalt, hash, compare } = require('bcrypt');
const { generateJWT } = require('../utils/jwt');
const { saltRound } = require('../config/default');

module.exports.signUp = async (req, res) => {
    try {
        const salt = await genSalt(saltRound);
        const hashedPassword = await hash(req.body.password, salt);
        const newUser = await createUser(req.body.email, req.body.name, hashedPassword);
        const token = generateJWT(newUser.id, newUser.email, newUser.role);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            token: token
        });
    } catch(error) {
        if (error.code ===  "P2002") {
            return res.status(403).json({
                success: false,
                message: 'User already exists'
            });
        }  else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
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
        const user = await fetchSingleUserById(req.body.email);
        if (!user || !(await compare(req.body.password, user.password))) {
            throw new Error('Invalid email or password')
        }
        const token = generateJWT(user.id, user.email, user.role);


        res.status(200).json({
            success: true,
            message: 'User found',
            data: {
                email: user.email
            },
            token: token
        });
    } catch(error) {
        res.send(error.message);
    }
}
 
module.exports.renderSignIn = async (req, res) => {
    try {
        res.render('login');
    } catch(error) {
        console.log(error);
        res.send(error);
    }
}