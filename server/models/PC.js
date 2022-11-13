const {DataTypes} = require('sequelize');


const PC = sequelize.define('pc',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    OS: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    light: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    guarantee: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    CPU: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    GPU: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    RAM: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    memory: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    power: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    motherboard: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cooling: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    frame: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:10
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue:10000
    },
    // image: {
    //     type: DataTypes.BLOB,
    //     allowNull: false,
    // },

}, {
    timestamps: false,
    tableName: 'pc'
})


module.exports = {PC}