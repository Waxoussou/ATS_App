const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ENV = require('../ENV');
const Recruiter = require('../models/recruiter');

router.post('/register', async (req, res) => {
    try {
        const { name, lastname, username, password } = req.body
        const users = await Recruiter.findOne({ username: username })

        if (!user) return res.status(401).send('username already exist');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Recruiter({
            name, lastname, username,
            password: hashedPassword
        });
        const saved_user = await newUser.save();
        res.status(200).send(saved_user);

    } catch (error) {
        console.log(`err : ${error}`);
        res.status(500).send(error)
    }
})

    .post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await Recruiter.findOne({ username: username });
            if (!user) return res.status(401).send({ status: 'failed', msg: 'user does not exist' });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).send({ status: 'failed', msg: 'wrong password or username ' });

            const token = await jwt.sign({ username: user.username, _id: user._id }, ENV.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({ status: 'success', data: user, token })
        } catch (error) {
            res.status(500).send({ status: 'failed', msg: error })
        }
    })
    .get('/logout', async (req, res) => {
        res.json({ action: 'logout' })
    })

module.exports = router; 