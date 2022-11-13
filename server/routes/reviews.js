const {Router} = require("express");
const {reviews} = require("../controllers/reviews");
const {checkAuth} = require("../utils/checkAuth");
const reviewsRouter = new Router()

reviewsRouter.post('/reviews' ,checkAuth, reviews)

module.exports={reviewsRouter}