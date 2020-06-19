const mongoose = require("mongoose");
const { Schema } = require("../lib/dbConnect");

const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: [60, "Մաքսիմում պետք է լինի 60 սիմվոլ"],
    min: [3, "Մինիմում պետք է լինի 3 սիմվոլ"]
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    link: { type: String, default: "default.jpg" },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
