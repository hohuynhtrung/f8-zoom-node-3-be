const exceptionHandler = (err, req, res, next) => {
  res.error({
    message: String(err),
  });
};

module.exports = exceptionHandler;
