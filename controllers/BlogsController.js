const Blog = require('../schema/Blog');
const saveFile = require('../lib/saveFile');
const BlogStructure = require('../data/BlogStructure');

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