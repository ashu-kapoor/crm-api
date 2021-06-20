const _ = require("lodash");

const roleEnum = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
});

module.exports = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;

  _.forEach([{ username }, { password }, { role }, { email }], (obj) => {
    _.forOwn(obj, function (value, key) {
      if (!value || !_.isString(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }

      if (key === "role" && !(value in roleEnum)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "email" && !validateEmail(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "password" && value.length < 6) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key + " : must be atleast 6 characters";
        throw error;
      }
    });
  });
  next();
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
