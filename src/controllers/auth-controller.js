const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');


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

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
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

        res.status(200).json({
            isAuthenticated: true,
            uid: user.id,
            name: user.name
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            isAuthenticated: false,
            msg: 'An error occurred, please try again'
        })

    }


};

const renewToken = (req, res = response) => {

    res.json({
        hero: 'Goku',
        msg: 'RENEW'
    })
};

module.exports = { createUser, login, renewToken };