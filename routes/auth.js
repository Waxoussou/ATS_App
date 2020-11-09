const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/permissions');

const authControllers = require("../controllers/auth");

router
    // @route     GET api/auth
    // @desc      Get logged in user
    // @access    Private
    .get('/', isAuthenticated, authControllers.getLoggedInUser)

    // @route     POST api/auth/register
    // @desc      Register to Api with credentials
    // @access    Public
    .post('/register', authControllers.register)

    // @route     POST api/auth/login
    // @desc      Login to Api with credentials
    // @access    Public
    .post('/login', authControllers.login)

    // @route     GET api/auth/logout
    // @desc      Logout to Api with credentials
    // @access    Private
    .get('/logout', authControllers.logout)

    // @route     DELETE api/auth/deleteProfile
    // @desc      Delete user profile 
    // @access    Private
    .delete('/deleteProfile', isAuthenticated, authControllers.deleteUser)

module.exports = router; 