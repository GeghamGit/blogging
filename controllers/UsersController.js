const User = require('../schema/User');
const generateToken = require('../utils/generateToken');
const valid = require('../validate/validate');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const client = require('../lib/redisConnect');
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
    const user = await User.findOne({ _id: req.params.id})

    //if user are not exist - return error
    if(!user) return res.json({message: 'User not found'});
    
    //if user finded - return user
    if(user){
      return res.json({message: "Finded user", data: user })
    }

    //if no error but user not find - return message
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

    if(!checked) return res.json(checked)

    //get user by email
    const user = await User.findOne({email: req.body.email})

    //if user already exist - return info message
    if(user) return res.json({message: `User with email ${req.body.email} already exist`});

    //call function for save image with user path
    // const imageName = await saveFile(image, imgConfPath = 'user', res, next);
  
    //create user data
    const newUser = new User(req.body);

    //save user in db
    const savedUser = await newUser.save();

    //call email sender function
    await verifyEmailTemplate.sendEmail(req, res, next, req.body.email, req.body.nickName);

    return res.json(savedUser);

  } catch (err) {
    return next(err);
  }
};

//login user...
exports.loginUser = async (req, res, next) => {
  try {

    //find user by email
    const user = await User.findOne({email: req.body.email});

    //if user dose not exist - return error
    if(!user || !user.checkPassword(req.body.password)) return res.json({ message: `Incorrect Email or Password !`});
  
    //generate secret token
    const token = await generateToken(user._id);

    //save token on Redis db
    await client.set('secretToket', token);

    return res.json({message: 'Login is succesfuly done'});
    
  } catch (error) {
    return next(error);
  }
};