const {PC, imagePC} = require("../models/association");
const {Reviews} = require("../models/Reviews");
const {Op} = require("sequelize");


const computers = async (req, res) => {
    try {

        const computers = await PC.findAll({
            include: [
                {
                    model: imagePC,
                    // attributes:['id', 'image'],
                    // where: {
                    //     '$imagePCs.id$': {
                    //         [Op.eq]: 1}
                    // }
                },
                {model: Reviews}
            ]
        })

        console.log(computers)

        if (!computers) {
            return res.json({message: 'er'})
        }

        res.json(computers)

    } catch (e) {
        res.json({message: '--------------'})
    }
}

const getById = async (req, res) => {
    try {

        const computer = await PC.findByPk(req.params.id)

        if (!computer) {
            return res.json({message: 'er'})
        }

        res.json(computer)

    } catch (e) {
        res.json({message: '--------------'})
    }
}

module.exports = {computers, getById}