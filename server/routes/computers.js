const {Router} = require('express')
const {computers, getById} = require("../controllers/computers");

const computersRouter = new Router()

computersRouter.get('/store', computers)

computersRouter.get('/store/:id', getById)

module.exports={computersRouter}