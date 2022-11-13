const {DataTypes} = require('sequelize');

const Reviews = sequelize.define('reviews', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        rate: {
            type: DataTypes.INTEGER,
        },

        text: {
            type: DataTypes.TEXT,
        },
        limitations: {
            type: DataTypes.TEXT,
        },
        dignity: {
            type: DataTypes.TEXT,
        },

        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'reviews'
    }
)

// Reviews.belongsTo(PC1)
// Reviews.belongsTo(User)

module.exports = {Reviews}