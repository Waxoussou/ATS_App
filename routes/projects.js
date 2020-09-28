const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Application = require('../models/application');

/**
 * GET ALL PROJECT FROM A USER
 * GET api/projects
 */
router.get('/', async (req, res) => {
    const { _id } = req.user;
    const options = req.query;
    try {
        const result = await Job.find({ recruiterId: _id }).populate({ path: 'applications', populate: { path: 'candidate_id' } }).exec();
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})

/**
 * POST A NEW PROJECT
 * POST api/project/new
 */
router.post('/new', async (req, res) => {
    const { title, required_tech, required_tools, localisation, salary } = req.body;
    const { _id } = req.user;
    try {
        const project = new Job({
            title,
            required_skills: { tech: required_tech, tools: required_tools },
            localisation: { city: localisation },
            salary,
            recruiterId: _id
        })
        const saved_project = await project.save();
        console.log(saved_project);
        res.status(200).send(saved_project);
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
})

router.put('/update:id', async (req, res) => {

})

/**
 * ADD APPLICATION TO A PROJECT [:id]
 * POST api/projects/addApplication:id 
 */
router.post('/:project_id/addApplication/:candidate_id', async (req, res) => {
    const { project_id, candidate_id } = req.params;
    try {
        // Check if candidate application already exist for this project 
        const current_project = await Job.findOne({ _id: project_id }).populate({ path: 'applications' }).exec();
        const doesApplicationAlreadyExist = current_project.applications.filter(app => app.candidate_id.toString() === candidate_id)
        if (doesApplicationAlreadyExist.length >= 1) return res.send({ status: 'error', msg: 'ce candidat est déjà rattaché à ce projet ' })

        // Save New application
        const new_application = new Application({
            candidate_id,
            status: 'created'
        })
        const application = await new_application.save();
        
        // add new application reference to project 
        current_project.applications.push(application._id);
        const updated_project = await current_project.save();

        res.send({ updated_project });
    } catch (error) {
        console.log(error)
    }
})

/**
 * DELETE PROJECT 
 * DELETE api/projects/delete:id
 */
router.delete('/delete:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const deleted_doc = await Job.findByIdAndDelete(id);
    console.log(deleted_doc);
    res.status(200).send('deleted ' + id + 'from DB')
})


module.exports = router;
