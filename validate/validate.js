exports.checkUserInfo = (req, res, next) => {
  let { firstName, surname, lastName, nickName, address, email, password } = req.body;

  if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
    return res.json({message: "Incomplate fields"});
  }
  const regexp = `/[.[\]{}()*+?.,\\$|#\s]/g, '\\&&'`;

  firstName = firstName.trim().replace(regexp);
  surname = surname.trim().replace(regexp);
  lastName = lastName.trim().replace(regexp);
  nickName = nickName.trim().replace(regexp);

  return true;
};