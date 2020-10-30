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
    console.log('REQ BODY =>', req.body)
    // const { _id } = req.user;
    const { name, lastname, current_position, expected_position,
        experience, availability, current_company } = req.body

    try {
        const candidate = new Candidate({
            name, lastname,
            current_position, expected_position, experience,
            availability, current_company
        })
        const new_candidate = await candidate.save();
        res.status(201).send(new_candidate)
    } catch (error) {
        res.status(500).send(error);
    }
})
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deleted_user = await Candidate.findByIdAndRemove(id)
            res.send(deleted_user)
        } catch (error) {
            console.log(error)
        }
    })
module.exports = router;