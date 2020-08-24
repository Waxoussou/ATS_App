const express = require('express')
const router = express.Router()
const Job = require('../models/job')

/**
 * GET ALL PROJECT FROM A USER
 * GET api/projects
 */

router.get('/', async (req, res) => {
    const { _id } = req.user
    try {
        const result = await Job.find({ recruiterId: _id });
        console.log(result)
    } catch (error) {
        console.log(error)
    }
})

    .post('/new', (req, res) => {
        console.log(req.user)
        req.user ? res.status(200).json(req.user) : res.status(500).send('nooo')
    })



module.exports = router;
