const User = require('../schema/User');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  });
});

passport.use('signup', new localStrategy({
  firstNameField : 'firstName',
  surnameField : 'surname',
  lastNameField : 'lastname',
  nickNameField : 'nickName',
  addressField : 'address',
  usernameField: 'email',
  passwordField : 'password'
}, async (firstName, surname, lastname, nickName, address, email, password, done) => {
  try {
    const user = await User.save({
      firstName,
      surname,
      lastname,
      nickName,
      address,
      email,
      password});

    return done(null, user);
  } catch (error) {
    return (error);
  }
}));

passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne( email );
    if( !user ){
      return done(null, false, { message : 'User not found'});
    }
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({

  secretOrKey : 'gh#1jwtSecretgh#1',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('token')

}, async (token, done) => {
  try {

    return done(null, token.user);
    
  } catch (error) {
    done(error);
  }
}));