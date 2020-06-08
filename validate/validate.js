exports.checkUserInfo = (req, res, next) => {
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

      return resolve(true);
    }catch(err){
      return reject(err)
    }
  })
};