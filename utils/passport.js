const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const User = require('../schema/User');

passport.use(new JWTStrategy({
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtKey: 'GH#1sJWTt94%#1',
}, (email, password, done) => {
  User.findOne({ email, password })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, {message: 'Incorrect email or password.'});
      }

      return done(null, user, {message: 'Logged In Successfully'});
    }).catch(done);
}));