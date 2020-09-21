const express = require('express')
const router = express.Router();

const Candidate = require('../models/candidate');

router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).send(candidates);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const { _id } = req.user;
    const { name, lastname, position, expected_position, experience, availability } = req.body
    try {
        const candidate = new Candidate({
            name, lastname,
            position, expected_position, experience,
            availability
        })
        const new_candidate = candidate.save();
        res.status(201).send(new_candidate)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;