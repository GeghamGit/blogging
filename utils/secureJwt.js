const jwt = require('jsonwebtoken');

const jwtKey = 'GH#1sJWTt94%#1';
const jwtExpirySeconds = 300;

exports.signIn = (req, res, next) => {
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
	return res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
}

exports.welcome = (req, res, next) => {

	const token = req.cookies.token

	if (!token) {
		return res.status(401);
	}

	let payload = '';
	try {
		payload = jwt.verify(token, jwtKey);
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.json({message: 'Unauthorized message'})
		}
		return res.json(error)
	}

	return res.json({message: `Welcome ${payload.email}!`})
}

exports.refresh = (req, res) => {
	const token = req.cookies.token

	if (!token) {
		return res.status(401);
	}

	let payload = '';
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401);
		}
		return res.status(400);
	}

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400);
	}

	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})

	return res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 });
}