const User = require('./user.model');

const express = require('express');

const app = express.Router();





app.post('/register', async (req, res) => {
    try {
        const { name,email, password ,role} = req.body;
        const getuser = await User.findOne({ email });
        if (getuser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name,email, password ,role});
        console.log('user: ', user);

        return res.status(201).send({ user });
    } catch (error) {
        return res.status(404).send({ error: 'Something went wrong' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User does not exist' });
        }
        if (user.password !== password) {
            return res.status(400).send({ message: 'Password is incorrect' });
        }
        return res.status(200).send({ message: 'Login successful' , token: user._id});
    } catch (error) {
        return res.status(404).send({ error: 'Something went wrong' });
    }
});

module.exports = app;