const Blog = require('../schema/Blog');
const saveFile = require('../lib/saveFile');
const BlogStructure = require('../data/BlogStructure');
const nodemailer = require('nodemailer');
const conf = require ('../config');

exports.getAllBlogs = (req, res, next) => {
  res.json({
    data: {
      getAllBlogs: true
    }
  })
};

exports.getBlogById = (req, res, next) => {
  res.json({
    data: {
      getBlogById: true
    }
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
  res.json({
    data: {
      updateById: true
    }
  })
};


const  transporter = nodemailer.createTransport(conf.smtpServer)

exports.sendEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    await transporter.sendEmail({
      from:conf.smtpServer.from,
      to: email,
      subject: 'Confirm Email',
      html: `<h1>Email verify</h1>`
    });

    transporter.close();
  } catch (err) {
    return next(err);
  }

}