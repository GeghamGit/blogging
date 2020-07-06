const client = require('../lib/redisConnect');

exports.userAuth = async (req, res, next) => {
  try{

    //get secret token from Redis db
    await client.get('secretToket', (err, result) => {

      //if getting crashed - return error
      if(err) throw new Error(err);

      //if token donse not exist - return error
      if(!result) return res.json({message: 'You are not Authorized'});

      //get token from request header
      const authToken = req.get('secretToket');

      //if tokens from Redis db and request header are not equals - return error
      if(authToken !== result) return res.json({message: 'You are not authorized'});
      return next();
    });
  }catch(error){
    return next(error);
  }
};