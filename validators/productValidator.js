const _ = require("lodash");

module.exports = (req, res, next) => {
  const name = req.body.name;
  const code = req.body.code;
  const listPrice = req.body.listPrice;

  _.forEach([{ name }, { code }, { listPrice }], (obj) => {
    _.forOwn(obj, function (value, key) {
      if (!value) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }

      if (key === "listPrice" && !matchesPattern(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }
    });
  });
  next();
};

function matchesPattern(val) {
  const re = /^\d{1,2}\.\d{1,2}$/;
  return re.test(String(val).toLowerCase());
}
