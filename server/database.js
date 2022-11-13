// const mysql = require('mysql');
//
// module.exports = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     // port     : config.get('port1'),
//     password : '1111',
//     database :  'forcepc',
// });

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'forcepc',
    username: 'root',
    password: '1111',
    logging: console.log,
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize

global.sequelize = sequelize