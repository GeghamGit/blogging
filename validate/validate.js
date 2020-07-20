const regexp = /[,\/!$%\^&\*;:{}=?+ \~()]/g;

//clean and check user data
function checkerRegExp (data){

  //cleaning data
  const cleadData = data.trim().replace(regexp,'');

  //if clened and requested datas are not equal - return error
  if(cleadData !== data) return ({status: false, data});

  return ({status: true, data})
}

exports.checkUserInfo = async (req, res, next, property) => {

  //get user data
  let { firstName, surname, lastName, nickName, address, email, password } = req.body;

  //check property - Is it for creating or updateing user
  if(property === 'create'){

    //if not exist some of field of user data - return error
    if(!firstName || !surname || !lastName || !nickName || !address || !email || !password){
      
      return res.json({message: 'Incomplate fields'});
    }
    
    //chechking all data for create
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

    const validPassword = await checkerRegExp(password);
    if(!validPassword.status) return res.json({message: `${validPassword.data}_is incorrect. Please use 0-9, A-Z, a-z and (#, ., @)`});

    return true;
    
  } else {

    //create empty object for chenged user datas
    const updateProfileData = {};

    //chechking all data for update
    if(firstName){
      const validFirstName = await checkerRegExp(firstName);
      if(!validFirstName.status) return res.json({message: `${validFirstName.data}_is incorrect`});
      updateProfileData.firstName = firstName;
    }

    if(surname){
      const validSurname = await checkerRegExp(surname);
      if(!validSurname.status) return res.json({message: `${validSurname.data}_is incorrect`});
      updateProfileData.surname = surname;
    }
    
    if(lastName){
      const validLastName = await checkerRegExp(lastName);
      if(!validLastName.status) return res.json({message: `${validLastName.data}_is incorrect`});
      updateProfileData.lastName = lastName;
    }

    if(nickName){
      const validNickName = await checkerRegExp(nickName);
      if(!validNickName.status) return res.json({message: `${validNickName.data}_is incorrect`});
      updateProfileData.nickName = nickName;
    }

    if(address){
      const validAddress = await checkerRegExp(address);
      if(!validAddress.status) return res.json({message: `${validAddress.data}_is incorrect`});
      updateProfileData.address = address;
    }

    return updateProfileData;
  }
};

exports.checkBlogInfo = async (req, res, next, property) => {

  //get blog data
  let { name, description } = req.body;

  //check property - Is it for creating or updateing blog
  if(property === 'create'){

    //chechking all data for create
    const validName = await checkerRegExp(name);
    if(!validName.status) return res.json({message: `${validName.data}_is incorrect`});
  
    const validDescription = await checkerRegExp(description);
    if(!validDescription.status) return res.json({message: `${validDescription.data}_is incorrect`});
  
    return true;
    
  } else {

    //create empty object for chenged blog datas
    const updateBlogData = {};

    //chechking all data for update
    if(name){
      const validName = await checkerRegExp(name);
        if(!validName.status) return res.json({message: `${validName.data}_is incorrect`});
        updateBlogData.name = name;
    }

    if(description){
      const validDescription = await checkerRegExp(description);
        if(!validDescription.status) return res.json({message: `${validDescription.data}_is incorrect`});
        updateBlogData.description = description;
    }

    return updateBlogData;
  }
};