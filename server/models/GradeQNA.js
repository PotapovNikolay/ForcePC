const {DataTypes} = require("sequelize");


const GradeQNA = sequelize.define('gradeqna', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        question:{
            type:DataTypes.TEXT,
        },
        answer:{
            type:DataTypes.TEXT,
        }
    },
    {
        timestamps: false,
        tableName: 'gradeqna'
    }
)

module.exports = {GradeQNA}