import express from 'express';
const app = express();
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import mySQLStore from 'express-mysql-session';
import bodyParser from 'body-parser';
import { redirect } from "react-router-dom";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv/config'
import localStrategyHandler from './utils/authentication.js'
import db from './utils/databaseConfig.js';
import generateHash from './utils/password.js';
localStrategyHandler(passport)

// const SQLSessionStore = (mySQLStore)(session)

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
    maxAge: 24 * 60 * 60 * 1000,
  },
  // store: session
}));

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
app.use(bodyParser.json());


app.post('/allusers', verifyToken, (req, res) => {
  // db.query('SELECT * FROM `user_credentials`',
  //   function (err, results) {
  //     res.send(results); // results contains rows returned by server
  //   }
  // );

  jsonwebtoken.verify(req.token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    console.log(req.token, user)
    if (err) return console.log('you do not have access, token incorrect')
    res.json = ({ user })
  })


})

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const userToken = authHeader && authHeader.split(' ')[1]

  if (userToken == null) return console.log('no user TOken')

  if (userToken && typeof userToken === 'string') {
    req.token = userToken
  }
  next()
}

// Will pass req.body.username and req.body.password to the strategy, strategy will respond
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) throw err;
    if (!user) {
      info.message ? res.send(info.message) : res.send('Please try again')
    }
    else {
      req.logIn(user, err => {
        if (err) throw err
        req.session.user = user;
      })
      const jwtAccessToken = jsonwebtoken.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_TOKEN_SECRET)
      res.json({ user: user, accessToken: jwtAccessToken })

    }
  })(req, res, next)
});

app.post('/adduser', (req, res) => {
  db.query('SELECT * FROM `user_credentials` WHERE `username` = ?', [req.body.username],
    function (err, results) {
      if (results.length === 1) {
        res.send('There is already a user with that username')
      } else if (results.length === 0) {
        db.query('INSERT INTO user_credentials (username,password) VALUES (?,?)',
          [req.body.username, `${generateHash(req.body.password)}`],
          (err, results) => {
            if (err) {
              console.log(err)
            } else {
              console.log('User added to DB')
            }
          })
      }
    })
});

app.listen(3001, () => {
  console.log('AYOO server running')
});