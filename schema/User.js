const crypto = require('crypto');
const mongoose = require('mongoose');
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
    email: true,
    trim: true,
    index: true
  },
  emailVerify: {
    verify: {
      type: Boolean,
      default: false
    },
    send: {
      type: Boolean,
      default: false
    },
    sendTime: {
      type: Date
    },
    hash: {
      type: String,
      index: true,
    },
  },
  passwordHash: {
    type: String
  },
  salt: {
    type: String,
  }
});

userSchema.virtual('password')
  .set(function(password) {
    if(password !== undefined){
      if(password.length <6){
        this.invalidate('password', 'Գաղտնաբառը չի կարող 6 սիմվոլից քիչ լինել');
      }
    }
    this._plainPassword = password;

    if(password){
      this.salt = crypto.randomBytes(5).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        10,
        5,
        'sha512',
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

  userSchema.methods.checkPassword = function(password) {
  if(!password) return false;
  if(!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    10,
    5,
    'sha512',
  ).toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);