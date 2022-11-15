import LocalStrategy from 'passport-local';
import db from './databaseConfig.js';
import bcrypt from 'bcrypt';

const localStrategyHandler = function(passport){
passport.use(new LocalStrategy (
    function (username, password, done) {
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
            
            bcrypt.compare(password, user[0].password,(err, result) => {
              if (err)  return done(err); 
              if (result == true) {
                  console.log('Password correct')
                  return done(null, user,{message: 'Incorrect Password'});
              } else {
                console.log(result,'Password incorrect')
                return done(null, false);
              }
            })})        
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null,user)
  });
  
  passport.deserializeUser(function(user, done) {
    console.log(user, 'deserialize')

    process.nextTick(function() {

      return done(null, user);
    });
  });
}

export default localStrategyHandler;