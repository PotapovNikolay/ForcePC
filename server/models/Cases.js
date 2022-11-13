const {DataTypes} = require('sequelize');

const Cases = sequelize.define('Cases', {
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
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    timestamps: false,
    tableName: 'cases'
})

module.exports={Cases}