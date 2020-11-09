const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../ENV');
const Recruiter = require("../models/recruiter");

module.exports = {
    getLoggedInUser: async (req, res) => {
        try {
            const user = await Recruiter.findById(req.user._id).select('-password');
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    register: async (req, res) => {
        try {
            const { firstname, lastname, username, email, password } = req.body
            const user = await Recruiter.findOne({ username: username })

            if (user) return res.status(401).send({ status: 'FAILED', msg: 'username already exist' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Recruiter({
                firstname, lastname, email, username,
                password: hashedPassword
            });
            const saved_user = await newUser.save();
            res.status(200).send({ status: 'SUCCESS', data: saved_user });
        } catch (error) {
            console.log(`err : ${error}`);
            res.status(500).send({ status: 'FAILED', msg: error })
        }
    },

    login: async (req, res) => {
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
    },

    logout: async (req, res) => {
        res.json({ action: 'logout' })
    },

    deleteUser: async (req, res) => {
        const { _id } = req.user, { password } = req.body;
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
    }
}