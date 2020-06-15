exports.checkUserInfo = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      let { firstName, surname, lastName, nickName, address, email, password } = req.body;

      if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
        return reject({message: "Incomplate fields"});
      }
      const regexp = `/[.[\]{}()*+?.,\\$|#\s]/g, '\\&&'`;

      firstName = firstName.trim().replace(regexp);
      surname = surname.trim().replace(regexp);
      lastName = lastName.trim().replace(regexp);
      nickName = nickName.trim().replace(regexp);

      return resolve({status: true});
    }catch(error){
      return reject({status: false, message: error})
    }
  })
};

exports.checkBlogInfo = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      let { name, description, image } = req.body;
      const regexp = `/[.[\]{}()*+?.,\\$|#\s]/g, '\\&&'`;

      name = name.trim().replace(regexp);
      description = description.trim().replace(regexp);
      image = image.trim().replace(regexp);

      return resolve({status: true});
    }catch(error){
      return reject({status: false, message: error})
    }
  })
};