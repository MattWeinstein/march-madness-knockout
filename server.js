const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require ('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`
});

app.post('/login', (req,res) => {
    db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
    [req.body.usernameEntered,req.body.passwordEntered],
    (err,results) => {
        if(err){
            console.log(err)
        } else{
            res.send('something')
        }
    })
})

app.listen(3001,()=>{
    console.log('AYOO server running')
});