const express = require('express')
const {Router} = require('express')
const {getMe, auth} = require("../controllers/auth");
const {checkAuth} = require("../utils/checkAuth");

const authRouter = new Router()

// Auth
authRouter.post('/auth',auth)

//Get me
authRouter.get('/me',checkAuth, getMe)


module.exports = {authRouter}


