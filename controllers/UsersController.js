const User = require('../schema/User');
const passport = require('passport');
const valid = require('../validate/validate');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
// const {saveFile} = require('../lib/saveFile');

//getting all users...
exports.getUsers = async(req, res, next) => {
  try{

    //check all users
    const users = await User.find({});

    //if users are not exist - return error
    if(!users) return res.json({message: 'Users not exist'});
      
    return res.json(users);

  } catch (err){
    return next(err);
  }
};

//getting user by own id...
exports.getUserById = async(req, res, next) => {
  try{

    //chack user by id
    const user = await User.find({ _id: req.params.id})

    //if user are not exist - return error
    if(!user) return res.json({message: 'User not found'});
      
    if(user){
      return res.json({message: "Finded user", data: user })
    }
      return res.json({message: "You are have not account, go to registrate if you want` "});
  }catch(err){
    return next(err);
  }
};

//checking user data and verify own email...
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
    if(user) return res.json(`User with email ${checked.email} already exist`)

    //call function for save image with user path
    // const imageName = await saveFile(image, imgConfPath = 'user', res, next);
  
    //call email sender function
    await verifyEmailTemplate.sendEmail(req, res, next);

    const finalUser = new User(checked);

    await finalUser.setPassword(checked.password);

    await finalUser.save();
    
    return res.json({ user: finalUser.toAuthJSON() });

  } catch (err) {
    return next(err);
  }
};

//login user...
exports.loginUser = (req, res, next) => {

  if(!req.body.email) {
    return res.json({message: 'email is required'});
  }

  if(!req.body.password) {
    return res.json({message: 'password is required'});
  }

  return passport.authenticate('local', {session: false}, async (err, passportUser) => {
    try {
      if(err){
        return next(err)
      }

      if(!passportUser) {
        return res.json({ message: 'Unauthorized user!'});
      }

      const user = passportUser;
      user.token = await passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
      
    } catch (error) {
      return next(error);
    }
})(req, res, next);
};