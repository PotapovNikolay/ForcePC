const {PC} = require("./PC");
const {Reviews} = require("./Reviews");
const {User} = require("./User");
const {imageReviews} = require("./ImageReviews");
const {imagePC} = require("./ImagePC");
const {Grade} = require("./Grade");
const {GradeQNA} = require("./GradeQNA");

PC.hasMany(Reviews, {
    foreignKey: 'pc_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// Reviews.belongsTo(PC)

User.hasMany(Reviews, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// Reviews.belongsTo(User)

User.hasMany(Grade, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// Grade.belongsTo(User)


Reviews.hasMany(imageReviews,{
    foreignKey:'reviews_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// imageReviews.belongsTo(Reviews)

PC.hasMany(imagePC,{
    foreignKey:'pc_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


Grade.hasMany(GradeQNA,{
    foreignKey:'grade_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// GradeQNA.belongsTo(Grade)

module.exports={
    PC,
    Reviews,
    User,
    imageReviews,
    imagePC,
    Grade,
    GradeQNA
}