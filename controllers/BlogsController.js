const Blog = require('../schema/Blog');
const { saveFile } = require('../lib/saveFile');
const BlogStructure = require('../data/BlogStructure');
const valid = require('../validate/validate')

exports.getAllBlogs = async (req, res, next) => {
    try{

      //check all blogs
      const blogs = await Blog.find({});

      //if blogs are not exist - return error
      if(!blogs) return next('Blogs are not found');
      
      return res.json(blogs);

    } catch (err){
      return next(err);
    }
};

exports.getBlogById = async(req, res, next) => {
    try{

      //check blog by id
      const blog = await Blog.findOne({ _id: req.params.id})

      //if blog is not exist - return error
      if(!blog) return next('Blog is not found');

      return res.json({message: "Finded blog", blog });

    } catch (err){
      return next(err);
    }
};

exports.createBlog = async (req, res, next) => {
  try {
    
    //check blog data
    const checked = await valid.checkBlogInfo(req, res, next);

    //if blog data is incorrect
    if(!checked.status) return next('Please enter correct information');

    //get data for new blog
    const { name, description } = checked;
    const image = req.body.image;

    //get image name
    const imageName = await saveFile(image, imgConfPath = 'ads', res, next);

    //create new blog model
    const blog = new Blog({
      name,
      description,
      image: { link: imageName }
    });

    //save new blog
    const resultat = await blog.save();

    const blogData = new BlogStructure(resultat);

    return res.json(blogData.getBlog());

  } catch (err) {
    return next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try{
    //get data for updateing blog
    const {
      name, description,
      image
    } = req.body;

    //check blog data
    const checked = await valid.checkBlogInfo(req, res, next);

    //if blog data is incorrect
    if(!checked.status) return next('Please enter correct information')

    //get image name
    const imgConfPath = 'ads';
    const imageName = await saveFile(image, imgConfPath, res, next);

    //check user by id
    const blog = await Blog.updateOne({ _id: req.params.id}, {name, description, image: { link: imageName } });
    
    //if blog is not exist - return error
    if(!blog) return next("Blog is can not updated");

    return res.json(blog)
    
  } catch(err){
    return next(err)
  }
};

exports.deleteBlog = async (req, res, next) => {
  try{
    //check blog by id
    const blog = await Blog.deleteOne({ _id: req.params.id});

    //if blog is not exist - return error
    if(!blog) return next('Blog is not exist');

    return res.json({message: "Blog is deleted", data: blog });

  } catch (err){
    return next(err);
  }
};