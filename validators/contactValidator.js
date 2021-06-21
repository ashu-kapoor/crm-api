const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");

const genderEnum = Object.freeze({
  Male: "Male",
  Female: "Female",
});

const titleEnum = Object.freeze({
  Mr: "Mr",
  Mrs: "Mrs",
  Ms: "Ms",
  Miss: "Miss",
});

module.exports.validateCreateContact = (req, res, next) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const title = req.body.title;
  const birthdate = req.body.birthdate;
  const department = req.body.department;
  const address = req.body.address;
  const phone = req.body.phone;
  const owner = req.body.owner;

  validateContact(
    [{ name }, { gender }, { title }, { phone }, { owner }],
    address,
    birthdate,
    department
  );

  next();
};

module.exports.validateUpdateContact = (req, res, next) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const title = req.body.title;
  const birthdate = req.body.birthdate;
  const department = req.body.department;
  const address = req.body.address;
  const phone = req.body.phone;

  validateContact(
    [{ name }, { gender }, { title }, { phone }],
    address,
    birthdate,
    department
  );

  next();
};

function validateContact(validationArray, address, birthdate, department) {
  _.forEach(validationArray, (obj) => {
    _.forOwn(obj, function (value, key) {
      if (!value || !_.isString(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }

      if (key === "gender" && !(value in genderEnum)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "title" && !(value in titleEnum)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "owner" && !mongoose.isValidObjectId(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "phone" && !validatePhone(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }
    });
  });

  //address
  if (
    !address ||
    !_.isObject(address) ||
    !address.street ||
    !_.isString(address.street) ||
    !address.city ||
    !_.isString(address.city)
  ) {
    const error = new Error();
    error.apiErrorCode = 1600;
    error.apiData = "address";
    throw error;
  }

  //birthdate and department optional
  if (
    !_.isEmpty(birthdate) &&
    !moment(birthdate, [moment.ISO_8601], true).isValid()
  ) {
    const error = new Error();
    error.apiErrorCode = 1600;
    error.apiData = "birthdate";
    throw error;
  }

  if (!_.isEmpty(department) && !_.isString(department)) {
    const error = new Error();
    error.apiErrorCode = 1600;
    error.apiData = "department";
    throw error;
  }
}

function validatePhone(val) {
  const re = /\d{10}$/;
  return re.test(String(val));
}
