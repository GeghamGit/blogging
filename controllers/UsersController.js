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
    const user = await User.findOne({ _id: req.params.id})

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

    //get user by email
    const user = await User.findOne({email: checked.email})

    //if user already exist - return info message
    if(user) return res.json({message: `User with email ${checked.email} already exist`});

    //call function for save image with user path
    // const imageName = await saveFile(image, imgConfPath = 'user', res, next);
  
    const newUser = new User(checked);
    const savedUser = await newUser.save();

    //call email sender function
    await verifyEmailTemplate.sendEmail(req, res, next, checked.email, checked.nickName);

    return res.json({savedUser});

  } catch (err) {
    return next(err);
  }
};

//login user...
exports.loginUser = (req, res, next) => {
  return passport.authenticate('local', async (err, user) => {
    try {
      if(err){
        return next(err)
      }

      if(!user) {
        return res.json({ message: 'Incorrect email or password !'});
      }

      req.logIn(user, async (err) => {
        if(err) return next(err);

        function token(email){
          const text = email.toString('base64');
          const key = 'fg1C0Sec77codeac99';
      
          return crypto.createHmac('sha512', key)
            .update(text)
            .digest('hex')
        };

        const user = await User.findOne({email: req.body.email});
        const newToken = await token(req.body.email);

        if(user.token !== newToken) return res.json({message: 'Incorrect email or password !'});

        return res.json({message: 'Login is succesful_(Authorized)'});
      });
      
    } catch (error) {
      return next(error);
    }
})(req, res, next);
};