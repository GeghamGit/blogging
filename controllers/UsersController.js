const User = require('../schema/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const valid = require('../validate/validate');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
// const {saveFile} = require('../lib/saveFile');

exports.getUsers = async(req, res, next) => {
  try{

    //check all users
    const users = await User.find({});

    //if users are not exist - return error
    if(!users) return next('Users are not exist');
      
    return res.json(users);

  } catch (err){
    return next(err);
  }
};

exports.getUserById = async(req, res, next) => {
  try{

    //chack user by id
    const user = await User.find({ _id: req.params.id})

    //if user are not exist - return error
    if(!user) return next('User not found');
      
    if(user){
      return res.json({message: "Finded user", data: user })
    }
      return next("You are have not account, go to registrate if you want` ");
  }catch(err){
    return next(err);
  }
};

exports.createUser = async(req, res, next) => {
  try{

    //check user data
    const checked = await valid.checkUserInfo(req, res, next);

    //if some of fields is wrong - return error
    if(!checked.status){
      return next('incorrect_fields');
    }

    //get user by email
    const user = await User.findOne({email: checked.email})

    //if user already exist - return info message
    if(user) return next(`User with email ${req.body.email} already exist`)

    //call function for save image with user path
    // const imageName = await saveFile(image, imgConfPath = 'user', res, next);
  
    //call email sender function
    await verifyEmailTemplate.sendEmail(req, res, next);
    
    return (checked)

  } catch (err) {
    return next(err);
  }
};

exports.signupUser = () => {
  passport.authenticate('signup', {session: false}, async(req, res, next) => {
    try{

      res.json({
        message : 'Signup successful',
        user: req.user
      });
  
    } catch (err) {
      return next(err)
    }
  })
};


exports.loginUser = (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if(err || !user){
        return next(new Error('An Error occurred'))
      }

      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)

        const body = { _id : user._id, email : user.email };

        const token = jwt.sign({ user : body },'gh#1jwtSecretgh#1');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
})(req, res, next);
};