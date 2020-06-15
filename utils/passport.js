const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../schema/User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
  return new Promise((resolve, reject) => {
    try{
      User.findOne({ email }, (err, user) => {
        if(!user || !user.checkPassword(password)) {
          return reject(done(null, false, { errors: { 'email or password': 'is invalid' } }));
        }
        return resolve(done(null, user, {message: 'Logged In Successfully'}));
      });
    } catch(error){
      return reject(error)
    }
  });
}));