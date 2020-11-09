const express = require('express')
const router = express.Router();

const candidateController = require('../controllers/candidates');

router
    /**
     * @route GET api/candidates
     * @desc get all candidates
     * @access Private
     */
    .get('/', candidateController.getCandidates)

    /**
     * @route POST api/candidates
     * @desc create new candidate
     * @access Private
     */
    .post('/', candidateController.createNewCandidate)

    /**
     * @route DELETE api/candidates/:id
     * @desc delete candidate 
     * @access Private
     */
    .delete('/:id', candidateController.deleteCandidate)

module.exports = router;