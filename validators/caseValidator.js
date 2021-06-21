const _ = require("lodash");
const mongoose = require("mongoose");

const stageEnum = Object.freeze({
  NEW: "NEW",
  WORKING: "WORKING",
  ESCALATED: "ESCALATED",
});

const priorityEnum = Object.freeze({
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
});

module.exports.validateCreateCase = (req, res, next) => {
  const caseNumber = req.body.caseNumber;
  const description = req.body.description;
  const stage = req.body.stage;
  const priority = req.body.priority;
  const owner = req.body.owner;
  const customer = result.params.contactId;

  validateCase(
    [{ customer }, { description }, { stage }, { priority }, { owner }],
    caseNumber
  );

  next();
};

module.exports.validateUpdateCase = (req, res, next) => {
  const caseNumber = req.body.caseNumber;
  const description = req.body.description;
  const stage = req.body.stage;
  const priority = req.body.priority;
  const customer = result.params.contactId;
  validateCase(
    [{ customer }, { description }, { stage }, { priority }],
    caseNumber
  );

  next();
};

function validateCase(validationArray, caseNumber) {
  _.forEach(validationArray, (obj) => {
    _.forOwn(obj, function (value, key) {
      if (!value || !_.isString(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }

      if (key === "stage" && !(value in stageEnum)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "priority" && !(value in priorityEnum)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (
        (key === "owner" || key === "customer") &&
        !mongoose.isValidObjectId(value)
      ) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      }
    });
  });

  //caseNumber
  if (!_.isInteger(caseNumber)) {
    const error = new Error();
    error.apiErrorCode = 1600;
    error.apiData = "caseNumber";
    throw error;
  }
}
