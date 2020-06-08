const jwt = require('jsonwebtoken');

const jwtKey = 'GH#1sJWTt94%#1';
const jwtExpirySeconds = 300;

exports.signIn = (req, res, next) => {
	return new Promise((resolve, reject) => {
		try{
      const { email, password } = req.body;

      if (!email || !password) {
        return reject({message: "Status code` 401"});
      }
      User.findOne({email: req.body.email, password: req.body.password}, (error, user) => {
        if(error){
          return reject(error)
        }
        if(user){
          const token = jwt.sign({ email }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          })
          res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
          return resolve(user)
        }
        return resolve({message: 'You are have not account, go to registrate if you want'})
      });
      return res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
    }catch(err){
      return reject(err)
    }
	});
}




exports.welcome = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try{
      const token = req.cookies.token;

      if (!token) {
        return reject({message: "Status code` 401"});
      }

      let payload = '';
      payload = jwt.verify(token, jwtKey);

      return resolve({message: `Welcome ${payload.email}!`})
    }catch(err){
      if (err instanceof jwt.JsonWebTokenError) {
        return reject({message: 'Unauthorized message'})
      }
      return reject(err)
    }
  });
}




exports.refresh = (req, res) => {
  return new Promise((resolve, reject) => {
    try{
      const token = req.cookies.token;

      if (!token) {
        return reject({message: "Status code` 401"});
      }

      let payload = '';
        payload = jwt.verify(token, jwtKey)

      const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
      if (payload.exp - nowUnixSeconds > 30) {
        return reject({message: "Status code` 400"});
      }

      const newToken = jwt.sign({ username: payload.username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });

      return res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
    }catch(err){
      if (err instanceof jwt.JsonWebTokenError) {
        return reject({message: "Status code` 401"});
      }
      return reject(err)
    }
  });
}