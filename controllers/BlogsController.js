const Blog = require('../schema/Blog');
const saveFile = require('../lib/saveFile');
const BlogStructure = require('../data/BlogStructure');
const valid = require('../validate/validate')

exports.getAllBlogs = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      Blog.find({}, (err, allBlogs) => {
        if(err){
          return reject({message: err.message});
        }
        return resolve(allBlogs);
      });
    }catch(error){
      return reject(error);
    }
  });
};

exports.getBlogById = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      Blog.findOne({ _id: req.params.id}, (err, blog) => {
        if(err){
          return reject({message: err});
        }
        return resolve({message: "Finded blog", data: blog });
      });
    }catch(error){
      return reject(error);
    }
  });
};

exports.createBlog = (req, res, next) => {
   return new Promise(async(resolve, reject) => {
    try {
      const {
        name, description,
        image, author
      } = req.body;
      
      const checked = await valid.checkBlogInfo((req, res, next));

      if(checked.status === true){
        const imgConfPath = 'ads';
        const imageName = await saveFile(image, imgConfPath);
    
        const blog = new Blog({
          name,
          description,
          author,
          image: { link: imageName }
        });
    
        const resultat = await blog.save();
    
        const blogData = new BlogStructure(resultat);
    
        return resolve(blogData.getBlog());
      } else {
        return reject(checked);
      }
    } catch (error) {
      return reject(next(error));
    }
  });
};

exports.updateBlog = (req, res, next) => {
  return new Promise(async(resolve, reject) => {
    try{
      const {
        name, description,
        image, author
      } = req.body;

      const checked = await valid.checkBlogInfo((req, res, next));

      if(checked.status === true){
        const imgConfPath = 'ads';
        const imageName = await saveFile(image, imgConfPath);

        Blog.updateOne({ _id: req.params.id}, {name, description, image: { link: imageName }, author }, async(err, updatedBlog) => {
          if(err){
            return reject({error: err , message: "Blog is can not updated"})
          }
          return resolve(updatedBlog)
        });
      }
      
      return reject(checked)

    } catch(error){
      return reject(error)
    }
  });
};


exports.deleteBlog = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      Blog.deleteOne({ _id: req.params.id}, (err, blog) => {
        if(err){
          return reject({message: err.message});
        }
        return resolve({message: "Blog is deleted", data: blog });
      });
    }catch(error){
      return reject(error);
    }
  });
};