const regexp = /[,\/!$%\^&\*;:{}=?+\~()]/g;

//clean and check user data
function checkerRegExp (data){
  const cleadData = data.trim().replace(regexp,'');
  if(cleadData !== data) return ({status: false});
  return ({status:true, data})
}

exports.checkUserInfo = async (req, res, next) => {

  //get user data
  let { firstName, surname, lastName, nickName, address, email, password } = req.body;

  //if not exist some of field of user data - return error
  if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
    
    return res.json({message: 'Incomplate fields'});
  }
  
  const validFirstName = await checkerRegExp(firstName);
  if(!validFirstName.status) return res.json({message: `${validFirstName.data}_is incorrect`});

  const validSurname = await checkerRegExp(surname);
  if(!validSurname.status) return res.json({message: `${validSurname.data}_is incorrect`});

  const validLastName = await checkerRegExp(lastName);
  if(!validLastName.status) return res.json({message: `${validLastName.data}_is incorrect`});

  const validNickName = await checkerRegExp(nickName);
  if(!validNickName.status) return res.json({message: `${validNickName.data}_is incorrect`});

  const validEmail = await checkerRegExp(email);
  if(!validEmail.status) return res.json({message: `${validEmail.data}_is incorrect`});

  return true;
};

exports.checkBlogInfo = async (req, res, next) => {

  //get blog data
  let { name, description } = req.body;

  const validName = await checkerRegExp(name);
  if(!validFirstName.status) return res.json({message: `${validName.data}_is incorrect`});

  const validDescription = await checkerRegExp(description);
  if(!validDescription.status) return res.json({message: `${validDescription.data}_is incorrect`});

  return true;
};