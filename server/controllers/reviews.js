const {User, Reviews} = require('../models/association')
const {path,dirname} = require('path')
const {fileURLToPath} = require('url')

const reviews = async (req,res)=>{
    try{
        const {text, rate, limitations, dignity} = req.body
        const user = await User.findByPk(req.userId)
        if (req.files){
            let fileName = Date.now().toString()+req.files.image.name
            // const __dirname = dirname(fileURLToPath(import.meta.url))
            // req.files.image.mv(path.join(__dirname,'..','uploads', fileName))
        }

    }catch (e) {

    }
}

module.exports = {reviews}