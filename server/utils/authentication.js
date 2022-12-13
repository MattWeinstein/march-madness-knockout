import LocalStrategy from 'passport-local';
import { user_db } from './databaseConfig.js';
import bcrypt from 'bcrypt';

const localStrategyHandler = function (passport) {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      user_db.query('SELECT * FROM `user_credentials` WHERE `username` = ?', [username],
        function (err, user) {
          if (err) {
            console.log('error')
            return done(err)
          }
          if (!user[0]) {
            return done(null, false, { message: 'No user found with entered username' })
          }

          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) return done(err);
            if (result == true) {
              console.log('Password correct')
              return done(null, user, { message: 'Correct password' });
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          })
        })
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user)
  });

  passport.deserializeUser(function (user, done) {
    console.log(user, 'deserialize')

    process.nextTick(function () {

      return done(null, user);
    });
  });
}

export default localStrategyHandler;