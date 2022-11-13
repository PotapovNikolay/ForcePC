const {DataTypes} = require('sequelize');

const imagePC = sequelize.define('imagePC', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    timestamps: false,
    tableName: 'imagepc'
})

module.exports={imagePC}