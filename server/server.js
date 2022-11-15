import express from 'express';
const app = express();
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import mySQLStore from 'express-mysql-session';
import bodyParser from 'body-parser';
import { redirect } from "react-router-dom";

import {} from 'dotenv/config'
import localStrategyHandler from './utils/authentication.js'
import db from './utils/databaseConfig.js';
import generateHash from './utils/password.js';
localStrategyHandler(passport)
const SQLSessionStore = (mySQLStore)(session)

// const mySQLStoreOptions = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: `${process.env.ROOT_PASSWORD}`,
//   database: 'mmko_data'
// }
// const sessionStore = new SQLSessionStore({},db)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    test: 'test',
    maxAge: 24*60*60*1000,
  }
    ,
  // store: sessionStore
}));

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
app.use(bodyParser.json());    

app.post('/test', (req,res) =>{
  db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[req.body.username] ,
    function(err, results) {
      console.log(req.body.username)
      res.send(results.data); // results contains rows returned by server
    }
  );    
})

  // Will pass req.body.username and req.body.password to the strategy, strategy will respond
  app.post('/login', function (req,res,next) {
    passport.authenticate('local', function (err,user,info) {
        if (err) throw err;
        if (!user){
          res.send('nooo, user not found')
        }
        else {
        req.logIn(user,err => {
          if(err) throw err
          res.send(user)
        })
        console.log('try1',req.session)
        
      }})(req,res,next)
    });

app.post('/adduser', (req,res) => {
    db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[req.body.username] ,
      function(err, results) {
        if (results.length === 1) {
          res.send('UThere is already a user with that username')
        } else if(results.length === 0) {
          db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
          [req.body.username,`${generateHash(req.body.password)}`],
          (err,results) => {
              if(err){
                  console.log(err)
              } else{
                console.log('User added to DB')
              }
          })}})
});

app.listen(3001,()=>{
    console.log('AYOO server running')
});