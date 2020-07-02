const crypto = require('crypto');

exports.checkUserInfo = async (req, res, next) => {

  //get user data
  let { firstName, surname, lastName, nickName, address, email, password } = req.body;

  //if not exist some of field of user data - return error
  if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
    
    return res.json({message: 'Incomplate fields'});
  }

  const regexp = /[,\/!$%\^&\*;:{}=?+\~()]/g;

  //clean and check user data
  const checkerRegExp = async(data) => {
    cleadData = data.trim().replace(regexp,'');
    if(cleadData !== data) return res.json({message: `${data}_is incorrect. Please enter correct values`});
  }

  function token(email){
    const text = email.toString('base64');
    const key = 'fg1C0Sec77codeac99';

    return crypto.createHmac('sha512', key)
      .update(text)
      .digest('hex')
  }
  
  await checkerRegExp(firstName);
  await checkerRegExp(surname);
  await checkerRegExp(lastName);
  await checkerRegExp(nickName);
  await checkerRegExp(email);
  const genToken = await token(email);

  return ({
    firstName,
    surname,
    lastName,
    nickName,
    address,
    email,
    password,
    token: genToken
  });    
};

exports.checkBlogInfo = async (req, res, next) => {

  //get blog data
  let { name, description } = req.body;

  const regexp = /[,\/!$%\^&\*;:{}=?+\~()]/g;

  //clean blog data
  name = name.trim().replace(regexp,'');
  description = description.trim().replace(regexp,'');

  return ({
    status: true,
    name,
    description
  });
};