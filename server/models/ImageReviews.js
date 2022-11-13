const {DataTypes} = require('sequelize');

const imageReviews = sequelize.define('imageReviews', {
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
    tableName: 'imagereviews'
})

module.exports = {imageReviews}