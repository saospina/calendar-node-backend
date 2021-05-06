const { response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');


// Create a user - Register option 
const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    
    try {

        let user =  await User.findOne({ email });
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
const login = (req, res = response) => {

    const { password, email } = req.body;


    res.status(201).json({
        hero: 'Goku',
        msg: 'Login',
        password,
        email
    })
};

const renewToken = (req, res = response) => {

    res.json({
        hero: 'Goku',
        msg: 'RENEW'
    })
};

module.exports = { createUser, login, renewToken };