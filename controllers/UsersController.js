const User = require('../schema/User');
const passport = require('passport');
const valid = require('../validate/validate');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const saveFile = require('../lib/saveFile');

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
        return next(checked);
      }

      //get user by email
      const user = await User.findOne({ email: req.body.email})

      //if user already exist - return info message
      if(user) return next(`User with email ${req.body.email} already exist`)
    
      //call email sender function
      await verifyEmailTemplate.sendEmail(req, res, next);

      //get user data
      const { firstName, surname, lastName, nickName, address, email, image, password } = req.body;

      //call function for save image with user path
      const imgConfPath = 'user';
      const imageName = await saveFile(image, imgConfPath);

      //create new user model from User schema
      const newUser = new User({
        firstName,
        surname,
        lastName,
        nickName,
        address,
        email,
        password,
        image: { link: imageName }
      });
      
  
      //save new user
      const savedUser = await newUser.save();

      //if user not saved - return error
      if (!savedUser) {
        return next('User is not saved');
      }

      return res.json(savedUser);
      
    } catch (err) {
      return next(err);
    }
};

exports.loginUser = (req, res, next) => {
  try{

    //get data from user
    const user = {email: req.body.email, password: req.body.password};
  
    //if email field is empty - return error
    if(!user.email) {
      return next({message: "email is required"});
    }
  
    //if password field is empty - return error
    if(!user.password) {
      return next({message: "password is required"});
    }
  
    return passport.authenticate('local', { session: false }, (err, passportUser) => {
      if(err) {
        return next(err);
      }
  
      if(passportUser) {
        console.log(passportUser)
        const user = passportUser;
        user.token = passportUser.generateJWT();
  
        return resolve({ user: user.toAuthJSON() });
      }
  
      return next(status(400));
    });
  } catch (err) {
    return next(err)
    }
};