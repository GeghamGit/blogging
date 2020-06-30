const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../schema/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if(!user || !user.validatePassword(password)) {
      return done(null, false, { error: 'email or password is invalid' });
    }
    return done(null, user);

  } catch (error) {
    return (error)
  }
}));