module.exports = (err) => {
  return new Promise((resolve, reject) => {
    try{
      return resolve({
        data: {},
        info: {
          error: true,
          array: false,
          time: new Date()
        },
        error: {
          error: err.message || 'Error message',
          status: err.status || 500
        }
      })
    }catch(err){
      return reject(err)
    }
  });
};