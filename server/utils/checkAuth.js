const jwt = require('jsonwebtoken')
const jwt_s = require("../config/default.json");

const checkAuth = (req,res,next)=>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    console.log('check',token)
    if(token){
        try{
            const decoded = jwt.verify(token, jwt_s.jwt_secret)

            req.userId = decoded.id


            next()
        }catch (e) {
            return res.json({
                message:'нет доступа'
            })
        }
    }else {
        return res.json({
            message:'нет доступа'
        })
    }
}

module.exports = {checkAuth}