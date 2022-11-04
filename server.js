const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require ('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require ('crypto');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

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

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM user_credentials WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
  }));

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