const response = (_, res, next) => {
  res.success = (data, status = 200) => {
    return res.status(status).json({
      status: "success",
      data,
    });
  };

  res.error = (error, status = 500) => {
    return res.status(status).json({
      status: "error",
      error,
    });
  };

  next();
};

module.exports = response;
