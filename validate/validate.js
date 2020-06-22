exports.checkUserInfo = async (req, res, next) => {

  //get user data
  let { firstName, surname, lastName, nickName, address, email, password } = req.body;

  //if not exist some of field of user data - return error
  if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
    
    return next('Incomplate fields');
  }

  const regexp = `/[.[\]{}()*+?.,\\$|#\s]/g, '\\&&'`;

  //clean user data
  firstName = firstName.trim().replace(regexp);
  surname = surname.trim().replace(regexp);
  lastName = lastName.trim().replace(regexp);
  nickName = nickName.trim().replace(regexp);
  email = email.trim();
  password = password.trim()

  return ({
    status: true,
    firstName,
    surname,
    lastName,
    nickName,
    address,
    email,
    password
  });    
};

exports.checkBlogInfo = async (req, res, next) => {

  //get blog data
  let { name, description } = req.body;

  const regexp = `/[.[\]{}()*+?.,\\$|#\s]/g, '\\&&'`;

  //clean blog data
  name = name.trim().replace(regexp);
  description = description.trim().replace(regexp);

  return ({
    status: true,
    name,
    description
  });
};