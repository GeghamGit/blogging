const User = require('../schema/User');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res, next) => {
  User.find({}, (err, allUsers) => {
    if(err){
      res.json({message: err.message});
    }
    return res.json(allUsers)
  });
};

exports.getUserById = (req, res, next) => {
  User.findOne({ id: req.params.id}, (err, user) => {
    if(err){
      res.json({message: err.message});
    }
    if(user){
      return res.json({message: "Finded user", data: user })
    }
    return console.log("You are have not account, go to registrate if you want` " )
  })
};

exports.createUser = (req, res, next) => {
  const { firstName, surname, lastName, nickName, address, email, password } = req.body;
  const user = new User({
    firstName,
    surname,
    lastName,
    nickName,
    address,
    email,
    password
  });

  user.save((err, savedUser) => {
    if (err) {
      res.json({message: err.message});
    } else {
      return res.json(savedUser)
    }
  });
};


const jwtKey = 'GH#1sJWTt94%#1';
const jwtExpirySeconds = 300;

exports.loginUser = (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.json(401)
  }
  User.findOne({email: req.body.email, password: req.body.password}, (error, user) => {
    if(error){
      return res.json(error)
    }
    if(user){
      const token = jwt.sign({ email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      })
      res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
      return res.json(user)
    }
    return res.json({message: 'You are have not account, go to registrate if you want'})
  })
	res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
}


exports.welcome = (req, res, next) => {

	const token = req.cookies.token

	if (!token) {
		return res.status(401)
	}

	const payload = '';
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.json({message: 'Unauthorized message'})
		}
		return res.json(error)
	}

	res.json({message: `Welcome ${payload.email}!`})
}