const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = require('../lib/dbConnect');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  nickName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  address: {
    country: { type: String },
    city: { type: String },
    address: { type: String }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  emaiIslVerify: {
    type: Boolean,
    default: false
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  },
  image: {
    link: { type: String, default: "default.jpg" },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
});

userSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'gh1sec-c0de-jwt77sec9Ac');
}

userSchema.methods.toAuthJSON = () => {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};


module.exports = mongoose.model('User', userSchema);