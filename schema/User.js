const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    index: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    link: { type: String, default: "default.jpg" },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
});


userSchema.pre('save', async(next) => {

  const user = this;

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

userSchema.methods.isValidPassword = async(password) => {

  const user = this;

  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

module.exports = mongoose.model('User', userSchema);