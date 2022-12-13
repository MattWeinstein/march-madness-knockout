import mysql from 'mysql2';

export const user_db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`,
});