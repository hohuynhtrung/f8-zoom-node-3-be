const exceptionHandler = (err, req, res, next) => {
  return res.error(500, err.message, err);
};

module.exports = exceptionHandler;
