const User = require('../schema/User');
const login = require('../utils/secureJwt');
const valid = require('../validate/validate');
const nodemailer = require('nodemailer');
const conf = require ('../config');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');

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

exports.createUser = async (req, res, next) => {
  
  const checked = await valid.checkUserInfo(req, res, next);
  
  if(!checked){
    return res.json({message: "Incorrect fields"})
  } else {

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
      return res.json({message: 'email is verifyed', data: savedUser});
    }
  });
  }
};

exports.loginUser = (req, res, next) => {
  login.signIn;
};


const  transporter = nodemailer.createTransport(conf.smtpServer);

exports.sendEmail = async (req, res, next) => {
  const { name, email } = req.body;

  const mailOptions = {
    from: conf.smtpServer.from,
    to: email,
    subject: 'Confirm Email',
    html: verifyEmailTemplate.template(name)
  };

  try {
    await transporter.sendMail(mailOptions,(error, info) => {
      if(error){
        return res.json(error);
      }
      res.json({message: 'Email is sended', data: info});
    });

    transporter.close();
  } catch (err) {
    return next(err);
  }
};