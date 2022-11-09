const LocalStrategy = require('passport-local');
const db = require ('./databaseConfig.js')
const bcrypt = require('bcrypt');


module.exports = function(passport){
passport.use(new LocalStrategy (
    function (username, password, done) {
      console.log(username)
      db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[username],
            function(err, user) {
                console.log('hel2lo')

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
              if (err)  return done(err); 
              if (result == true) {
                  console.log('Password correct')
                  return done(null, user);
              } else {
                console.log(result,'Password incorrect')
                return done(null, false);
              }
            })})        
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
}
