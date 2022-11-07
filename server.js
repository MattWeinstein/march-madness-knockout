const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require ('cors');
const passport = require('passport');
const crypto = require ('crypto');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bcrypt = require('bcrypt');
const flash = require('express-flash')
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // store: new SQLiteStore({ db: 'user_credentials.db', dir: './var/db' })
}));
app.use(passport.initialize())
app.use(passport.session())

const initializePassport = require('./passport.config.js')
initializePassport(passport,username => {
  return  (db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[username]
  ))
})


// app.use(express.session({ secret: 'SECRET' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions




const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`
});

// app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.authenticate('session'));

  

app.post('/test', (req,res) =>{
  db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[req.body.username] ,
    function(err, results) {
      console.log(req.body.username)
      console.log(results); // results contains rows returned by server
    }
  );    
})

  // Will pass req.body.username and req.body.password to the strategy, strategy will respond
  app.post('/login', (req,res,next) =>{
    passport.authenticate('local',(err,user,info) => {
        if (err) throw err;
        if (!user){
        console.log(err)
        console.log(info)
        console.log(user)
        res.send("No user exists");
        }
        else {
            req.logIn(user,err => {
                if(err) throw err
                res.send('succesfully authenticated')
                console.log(req.user)
            })
        }
    })(req,res,next)
});

app.post('/adduser', (req,res) => {
    db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
    [req.body.username,req.body.password],
    (err,results) => {
        if(err){
            console.log(err)
        } else{
            res.send('User added to DB')
        }
    })
})

app.listen(3001,()=>{
    console.log('AYOO server running')
});