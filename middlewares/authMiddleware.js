const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    const error = new Error();
    error.apiErrorCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.jwtSecret);
  } catch (err) {
    const error = new Error();
    error.apiErrorCode = 401;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error();
    error.apiErrorCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
