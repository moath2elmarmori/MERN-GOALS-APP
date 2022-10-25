module.exports.errorMiddlewareHnadler = (err, req, res, next) => {
  // if the controller throw an error and set the statusCode you will receive the status code in (res.statusCode)
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};
// stack: process.env.NODE_ENV === "production" ? null : err.stack,
