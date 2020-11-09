const express = require('express');
const router = express.Router();

const controller = require('../controllers/projects');

router
    /**
     * @route GET api/projects
     * @desc GET ALL PROJECT FROM A USER
     * @access Private
     */
    .get('/', controller.getAllProject)

    /**
     * @route POST api/projects/new
     * @desc POST A NEW PROJECT
     * @access Private
     */
    .post('/new', controller.createNewProject)

    /**
     * @route PUT api/projects/update:id
     * @desc Update a project 
     * @access Private
     */
    .put('/update:id', controller.updateProject)

    /**
     * @route POST api/projects/:project_id/addApplication:candidate_id 
     * @desc  ADD APPLICATION TO A PROJECT [:id]
     * @access Private
     */
    .post('/:project_id/addApplication/:candidate_id', controller.CreateNewApplication)

    /**
     * @route DELETE api/projects/delete:id
     * @desc DELETE PROJECT 
     * @access Private
     */
    .delete('/delete:id', controller.deleteProject)


module.exports = router;
