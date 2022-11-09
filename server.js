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
const bodyParser = require('body-parser')


require('dotenv').config();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // store: new SQLiteStore({ db: 'user_credentials.db', dir: './var/db' })
}));

app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
app.use(bodyParser.json());                        


// app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'mmko_data',
    password: `${process.env.ROOT_PASSWORD}`
});

function generateHash(password){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password,salt);
  
  return hash
}

passport.use(new LocalStrategy (
  function (username, password, done) {
    console.log(username)
    db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[username],
          function(err, user) {
            if (err)  {
              console.log('error')
              return done(err)
            }
            if (!user[0]) {
              console.log('no user')
              return done(null, false)
            }
            if (user) {
              console.log(password)
              console.log(user[0].password)
            }

            bcrypt.compare(password, user[0].password,(err, result) => {
              console.log('compparing...')
              if (err)  return done(err); 
              if (result == true) {
                  console.log('Password correct')
                  return done(null, user);
              } else {
                console.log(result,'Password incorrect')
                return done(null, false);
              }
            })
          }
    )
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
      res.send(results.data); // results contains rows returned by server
    }
  );    
})

  // Will pass req.body.username and req.body.password to the strategy, strategy will respond
  app.post('/login', 
    passport.authenticate('local',
      function  (req,res) {
        console.log('response heard',res)

    // (err,user,info) => {
    //     if (err) throw err;
    //     if (!user){
    //     console.log(err)
    //     console.log(info)
    //     console.log(user)
    //     res.send("No user exists");
    //     }
    //     else {
    //         req.logIn(user,err => {
    //             if(err) throw err
    //             res.send('succesfully authenticated')
    //             console.log(req.user)
    //         })
    //     }
    // }
      }
    ));

app.post('/adduser', (req,res) => {
    db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
    [req.body.username,`${generateHash(req.body.password)}`],
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