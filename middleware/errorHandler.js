const { constants } = require("../constants");
const errorHandler = (req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  //if we have a status code , we're gonna pass this status code , else the status code passed is 500

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation failed",
        message: errorHandler.message,
        stackTrace: errorHandler.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "not found",
        message: errorHandler.message,
        stackTrace: errorHandler.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        message: errorHandler.message,
        stackTrace: errorHandler.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: errorHandler.message,
        stackTrace: errorHandler.stack,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: errorHandler.message,
        stackTrace: errorHandler.stack,
      });

    default:
      console.log("no error!! everything in the right order");
      break;
  }
};
module.exports = errorHandler;
