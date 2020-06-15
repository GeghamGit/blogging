const User = require('../schema/User');
const passport = require('passport');
const valid = require('../validate/validate');
const nodemailer = require('nodemailer');
const conf = require ('../config');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const saveFile = require('../lib/saveFile');

exports.getUsers = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      User.find({}, (err, allUsers) => {
        if(err){
          return reject({message: err.message});
        }
        return resolve(allUsers);
      });
    }catch(error){
      return reject(error);
    }
  });
};

exports.getUserById = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      User.find({ _id: req.params.id}, (err, user) => {
        if(err){
          return reject({message: err.message});
        }
        if(user){
          return resolve({message: "Finded user", data: user })
        }
        return resolve("You are have not account, go to registrate if you want` ");
      });
    }catch(error){
      return reject(error);
    }
  });
};

exports.createUser = async (req, res, next) => {
  return new Promise(async(resolve, reject) => {
    try{
      const checked = await valid.checkUserInfo(req, res, next);
  
      if(!checked.status){
        return reject({message: "Incorrect fields"})
      } else {
    
        const { firstName, surname, lastName, nickName, address, email, image, password } = req.body;
        const imgConfPath = 'user';
        const imageName = await saveFile(image, imgConfPath);

        const user = new User({
          firstName,
          surname,
          lastName,
          nickName,
          address,
          email,
          password,
          image: { link: imageName }
        });
    
        user.save(async(err, savedUser) => {
          if (err) {
            return reject({message: err.message});
          }
          await user.findOne({'emailVerify.hash': req.params.hash});
          user.emailVerify.verify = true;
          return resolve({message: 'email is verifyed', data: savedUser});
        });
      }
    }catch(error){
      return reject(error);
    }
  });
};

exports.loginUser = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      const user = {email: req.body.email, password: req.body.password};
    
      if(!user.email) {
        return reject({message: "email is required"});
      }
    
      if(!user.password) {
        return reject({message: "password is required"});
      }
    
      return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if(err) {
          return reject(next(err));
        }
    
        if(passportUser) {
          console.log(passportUser)
          const user = passportUser;
          user.token = passportUser.generateJWT();
    
          return resolve({ user: user.toAuthJSON() });
        }
    
        return reject(status(400));
      });
    } catch(error){
      return reject(error)
    }
  });
};


const  transporter = nodemailer.createTransport(conf.smtpServer);

exports.sendEmail = (req, res, next) => {
  return new Promise(async(resolve, reject) => {
    try{
      const { name, email } = req.body;

      const mailOptions = {
        from: conf.smtpServer.from,
        to: email,
        subject: 'Confirm Email',
        html: verifyEmailTemplate.template(name)
      };

      await transporter.sendMail(mailOptions,(err, info) => {
        if(err){
          return reject(err);
        }
        return resolve({message: 'Email is sended', data: info});
      });
  
      transporter.close();

    }catch(error){
      return reject(error);
    }
  });
};