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
  store: new SQLiteStore({ db: 'user_credentials.db', dir: './var/db' })
}));

app.use(passport.authenticate('session'));

passport.use(new LocalStrategy(function verify(username, password, done) {
    db.get('SELECT * FROM user_credentials WHERE username = ?', [ username ], function(err, user) {
      if (err)  return done(err); 
      if (!user) return done(null, false); 
  
      bcrypt.compare(password, user.password,(err, result) => {
        if (err)  return done(err); 
        if (result === true) {
            return done(user, false);
        }else {
            return done(null, false);
        }

    });
  })}));

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
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.post('/adduser', (req,res) => {
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