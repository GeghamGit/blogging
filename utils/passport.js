const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../schema/User');

passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(async function(_id, done){
  const user = await User.findOne({_id});
  !user ? false: user;
  done(null, user);
});

passport.use(new LocalStrategy({
  useruserameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if(!user || !user.checkPassword(password)) {
      return done(null, false, { message: 'email or password is invalid' });
    }
    
    return done(null, user);

  } catch (error) {
    return (error)
  }
}));