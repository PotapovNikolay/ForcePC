const {DataTypes} = require("sequelize");


const Grade = sequelize.define('grade', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        }
    },
    {
        timestamps: false,
        tableName: 'grade'
    }
)

module.exports = {Grade}