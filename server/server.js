const express = require('express');
const app = express();
const cors = require ('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bodyParser = require('body-parser')

require('dotenv').config();
require('./utils/authentication')(passport)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // store: new SQLiteStore({ db: 'user_credentials.db', dir: './var/db' })
}));
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
app.use(bodyParser.json());    

const db = require ('./utils/databaseConfig');
const password =  require('./utils/password')

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
    passport.authenticate('local', (err,user,info) => {
        console.log('response heard',user)
      }))
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
    //   }
    // ));

app.post('/adduser', (req,res) => {
    db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
    [req.body.username,`${password.generateHash(req.body.password)}`],
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