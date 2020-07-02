const crypto = require('crypto');
const { Schema, model } = require('../lib/dbConnect');

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
  image: {
    link: { type: String, default: "default.jpg" },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  IsEmailVerify: {
    type: Boolean,
    default: false
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String
  },
  token: {
    type: String,
    unique: true,
  }
});

userSchema.virtual('password')
  .set(function(password){
    if(password !== undefined) {
      if(password.length < 6) {
        this.invalidate('password', 'Password must be minimum 6 symbols')
      }
    }

    this._plainPassword = password;

    if(password) {
      this.salt = crypto.randomBytes(16).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        100,
        16,
        'sha512'
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function(){
    return this._plainPassword
  });

userSchema.methods.checkPassword = function(password){
  if(!password) return false;
  if(!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    100,
    16,
    'sha512'
  ).toString('base64') === this.passwordHash;
};

module.exports = model('User', userSchema);