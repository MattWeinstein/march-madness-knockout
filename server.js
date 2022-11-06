const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require ('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require ('crypto');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bcrypt = require('bcrypt');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`
});

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // store: new SQLiteStore({ db: 'user_credentials.db', dir: './var/db' })
}));

app.use(passport.authenticate('session'));

passport.use(new LocalStrategy(
  function verify(username, password, done) {
    db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[username],
        function(err, user) {
        if (err)  return done(err); 
        if (!user) return done(null, false); 
        if (user) return done(user, user); 

        
        // bcrypt.compare(password, user.password,(err, result) => {
        //   if (err)  return done(err); 
        //   if (result === true) {
        //       return done(user, false);
        //   } else {
        //       return done(null, false);
        //   }
        // });
        })
  }
));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  

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