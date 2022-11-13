const {PC, imagePC, Grade, GradeQNA, Reviews, User} = require("../models/association");
const {dirname} = require('path')
const path = require('path')
const {fileURLToPath} = require('url')
const {Cases} = require("../models/Cases");
const {Op} = require("sequelize");


const main = async (req, res) => {
    try {


        const computers = await PC.findAll({include: imagePC})
        const grades = await Grade.findAll({include: GradeQNA})
        const cases = await Cases.findAll()
        const reviews = await User.findAll({
            include: {
                model: Reviews,
            },
            attributes: ['name', 'sername'],
            where: {
                '$reviews.id$': {
                    [Op.not]: null
                }
            }
        })


        // const user = await User.findByPk(id)
        //
        if (!reviews){
            return res.json({message: 'er'})
        }

        if (!computers) {
            return res.json({message: 'er'})
        }

        if (!grades) {
            return res.json({message: 'er'})
        }

        if (!cases) {
            return res.json({message: 'er'})
        }

        res.json({computers, grades, cases, reviews})

    } catch (e) {
        res.json({message: `err, ${e}`})
    }
}

module.exports = {
    main
}