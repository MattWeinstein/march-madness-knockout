import mysql from 'mysql2';

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`,
    

});

export default db;