const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { isAuthenticated } = require('../middlewares/permissions');
const ENV = require('../ENV');
const Recruiter = require('../models/recruiter');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', isAuthenticated, async (req, res) => {
    console.log('HELLLO AUTH')
    try {
        const user = await Recruiter.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, lastname, username, password } = req.body
        const user = await Recruiter.findOne({ username: username })

        if (user) return res.status(401).send({ status: 'FAILED', msg: 'username already exist' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Recruiter({
            name, lastname, username,
            password: hashedPassword
        });
        const saved_user = await newUser.save();
        res.status(200).send({ status: 'SUCCESS', data: saved_user });

    } catch (error) {
        console.log(`err : ${error}`);
        res.status(500).send({ status: 'FAILED', msg: error })
    }
})

    .post('/login', async (req, res) => {
        console.log('LOGIN ROUTE')
        try {
            const { username, password } = req.body;
            console.log(username, password)
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

    .delete('/deleteProfile', isAuthenticated, async (req, res) => {
        const { _id } = req.user,
            { password } = req.body;
        try {
            const user = await Recruiter.findOne({ _id });
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                const removedUser = await Recruiter.deleteOne({ _id });
                res.json(removedUser);
            } else {
                throw new Error('you need to enter your password to delete your profile')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send({ status: 'FAILED', msg: error.message, type: 'DELETE_PROFILE' })
        }
    })

module.exports = router; 