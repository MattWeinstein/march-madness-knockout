const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`
});

module.exports = db;