const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/UserSchema');
const { generateJWT } = require('../helpers/jwt');



// Create a user - Register option 
const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                ok: false,
                msg: `${user.name} already exists`
            })
        }
        user = new User(req.body);

        //bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please contact your administrator'
        })
    }
};


// Login
const login = async (req, res = response) => {

    const { password, email } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                isAuthenticated: false,
                msg: `User and password does not match,  please try again`
            })
        };

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                isAuthenticated: false,
                msg: 'Invalid password or email, please try again'
            })
        };

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            isAuthenticated: true,
            uid: user.id,
            name: user.name,
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            isAuthenticated: false,
            msg: 'An error occurred, please try again'
        })

    }


};

//Renew Token
const renewToken = async (req, res = response) => {
    const { uid, name } = req;


    //Generate JWT
    const token = await generateJWT(uid, name);
    res.status(200).json({
        isAuthenticated: true,
        token
    })
};

module.exports = { createUser, login, renewToken };