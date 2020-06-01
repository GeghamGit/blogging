module.exports = (err) => {
  return new Promise((resolve, reject) => {
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
  })
};