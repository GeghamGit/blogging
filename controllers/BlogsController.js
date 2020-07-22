const Blog = require('../schema/Blog');
const valid = require('../validate/validate');
const User = require('../schema/User');
// const { saveFile } = require('../lib/saveFile');

exports.getAllBlogs = async (req, res, next) => {
    try{

      //check all blogs
      const blogs = await Blog.find({});

      //if blogs are not exist - return error
      if(!blogs) return res.json({message: 'Blogs are not found'});
      
      return res.json(blogs);

    } catch (err){
      return next(err);
    }
};

exports.getAllMyBlogs = async (req, res, next) => {
  try{

    //check all blogs
    const myBlogs = await Blog.find({author: req.body.userId}).populate('author');

    //if blogs are not exist - return error
    if(!myBlogs) return res.json({message: 'Blogs are not found'});

    return res.json(myBlogs);

  } catch(err) {
    return next(err)
  }
}

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
    
    //create property for chechking blog data before create
    const property = 'create';

    //check blog data
    const checked = await valid.checkBlogInfo(req, res, next, property);

    //if blog data is incorrect
    if(!checked) return res.json(checked);

    //get data for new blog
    const { name, description, author } = req.body;

    //find user by id
    const user = await User.findById({_id: author});

    //if user not found - return error
    if(!user) return res.json({message: 'User not found'});

    // const image = req.body.image;

    //get image name
    // const imageName = await saveFile(image, imgConfPath = 'ads', res, next);

    //create new blog model
    const blog = new Blog({
      name,
      description,
      author: user._id
      // image: imageName
    });

    //save new blog
    const savedBlog = await blog.save();

    return res.json({message: 'Blog created !', savedBlog});

  } catch (err) {
    return next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try{

    //check blog data
    const checked = await valid.checkBlogInfo(req, res, next);

    //if blog data is incorrect
    if(!checked) return next('Please enter correct information')

    //get image name
    // const imageName = await saveFile(image, imgConfPath = 'ads', res, next);

    //find blog by id
    const blog = await Blog.findById({ _id: req.params.id});
    
    //if blog is not exist - return error
    if(!blog) return next("Blog is can not updated");

    //if user change that fields , change it in blog too
    if(checked.name) blog.name = checked.name;
    if(checked.description) blog.description = checked.description;

    //save changed blog in db
    await blog.save();

    return res.json({message: 'Blog updated'});
    
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