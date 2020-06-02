const Blog = require('../schema/Blog');
const saveFile = require('../lib/saveFile');
const BlogStructure = require('../data/BlogStructure');
const nodemailer = require('nodemailer');
const conf = require ('../config');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');

exports.getAllBlogs = (req, res, next) => {
  Blog.find({}, (err, allBlogs) => {
    if(err){
      return res.json({message: err.message});
    }
    return res.json(allBlogs)
  });
};

exports.getBlogById = (req, res, next) => {

  Blog.findOne({ id: req.params.id}, (err, blog) => {
    if(err){
      return res.json({message: err.message});
    }
    return res.json({message: "Finded blog", data: blog })
  })
};

exports.createBlog = async (req, res, next) => {
  try {
    const {
      name, description,
      image, author
    } = req.body;

    const imageName = await saveFile(image);

    const blog = new Blog({
      name,
      description,
      author,
      image: { link: imageName }
    });

    const resultat = await blog.save();

    const blogData = new BlogStructure(resultat);

    return res.json(blogData.getBlog());
  } catch (err) {
    return next(err);
  }
};

exports.updateBlog = (req, res, next) => {
  const {
    name, description,
    image, author
  } = req.body;

  res.json({
    data: {
      updateById: true
    }
  })
};


exports.deleteBlog = (req, res, next) => {
  Blog.deleteOne({ id: req.params.id}, (err, blog) => {
    if(err){
      return res.json({message: err.message});
    }
    return res.json({message: "Blog is deleted", data: blog })
  })
};


const  transporter = nodemailer.createTransport(conf.smtpServer)

exports.sendEmail = async (req, res, next) => {
  const { name,email } = req.body;
  try {
    await transporter.sendEmail({
      from:conf.smtpServer.from,
      to: email,
      subject: 'Confirm Email',
      html: verifyEmailTemplate(name)
    });

    transporter.close();
  } catch (err) {
    return next(err);
  }
}