const User = require('../schema/User');
const signIn = require('../utils/secureJwt')

exports.getUsers = (req, res, next) => {
  User.find({}, (err, allUsers) => {
    if(err){
      res.json({message: err.message});
    }
    return res.json(allUsers)
  });
};

exports.getUserById = (req, res, next) => {
  User.findOne({ id: req.params.id}, (err, user) => {
    if(err){
      res.json({message: err.message});
    }
    if(user){
      return res.json({message: "Finded user", data: user })
    }
    return console.log("You are have not account, go to registrate if you want` " )
  })
};

exports.createUser = (req, res, next) => {
  const { firstName, surname, lastName, nickName, address, email, password } = req.body;
  const user = new User({
    firstName,
    surname,
    lastName,
    nickName,
    address,
    email,
    password
  });

  user.save(async(err, savedUser) => {
    if (err) {
      return res.json({message: err.message});
    } else {

      await user.findOne({'emailVerify.hash': req.params.hash});
      user.emailVerify.verify = true;
      user.save();
      res.json({message: 'email is verifyed'});
      return res.json(savedUser);
    }
  });
};

exports.loginUser = (req, res, next) => {
  signIn;
}