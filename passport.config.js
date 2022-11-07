const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

function initialize(passport,getUserByUsername){
    const verify = (username, password, done) => {
        const user = getUserByUsername(username)
        if (!user) return done(null, false),{ message: 'No user with that username'}; 

        try{
            if (bcrypt.compare(password, user.password)){
                return done (null,user)
            } else{
                return done(null,false, {message: 'Incorrect password'})
            }
        } catch (err){
            return (err,false)
        }

        db.query('SELECT * FROM `user_credentials` WHERE `username` = ?',[username],
            function(err, user) {
              if (err)  return done(err); 
              if (!user) return done(null, false),{ message: 'Incorrect username or password.' }; 
              if (user) return done(user, user); 
    
            bcrypt.compare(password, user.password,(err, result) => {
              if (err)  return done(err); 
              if (result === true) {
                  return done(user, false);
              } else {
                  return done(null, false);
              }
            });
            })
        }
    

    passport.use(new LocalStrategy(verify));

    passport.serializeUser((user, done) => {
        process.nextTick(function() {
            done(null, { id: user.id, username: user.username });
        });
      });
      
      passport.deserializeUser((user, done) => {
        process.nextTick(function() {
          return done(null, user);
        });
      });
}

module.exports = initialize