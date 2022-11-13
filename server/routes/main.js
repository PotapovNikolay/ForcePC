const {Router} = require("express");
const {main} = require("../controllers/main");
const mainRouter = new Router()

mainRouter.get('/', main)

module.exports={mainRouter}