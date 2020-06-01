class BlogStructure {

  constructor(data = null) {
    this.data = data;
  };

  getBlog = () => {
   return this._transformRental(this.data)
  };
  
  getBlogs = () => {
    return this._transformRental(this.data, true)
  };

  _blogDataStructure = (blog) => {
    return{
      id: blog._id,
      name: blog.name,
      description: blog.description,
      image: blog.image,
      author: blog.author
    }
  };

  _transformBlog = (blog, array = false) => {
    return{
      data: array ? blog.map(this._blogDataStructure): this._blogDataStructure(blog),
      info: {
        error: false,
        array,
        time: new Date()
      },
      error: {}
    }
  };
}

module.exports = BlogStructure;