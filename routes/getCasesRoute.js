/****************
Generated by NODEBOOTSTRAPPER
Author: Ashutosh Kapoor
GIT LINK : https://github.com/ashu-kapoor/NODEBOOTSTRAPPER
****************/

/**
 * @param {object} app - express instance
 * @param {array} middlewares - array of middlewares to be applied to this route
 * @param {function} validator - validator function if passed
 **/

const { getCasesController } = require("../controllers/getCasesController");

module.exports.getCases = (app, middlewares, validator = null) => {
  const middleWaresList = [];
  if (middlewares && lodash.isArray(middlewares)) {
    middlewares.forEach((middleware) => {
      if (lodash.isFunction(middleware)) {
        middleWaresList.push(middleware);
      } else {
        throw new Error("Middleware not function " + getCasesRoute);
      }
    });
  }

  if (validator && lodash.isFunction(validator)) {
    middleWaresList.push(validator);
  } else if (validator) {
    throw new Error("Validator not function " + getCasesRoute);
  }
  middleWaresList.push(getCasesController);
  app.get("/crm/v1/contacts/:contactId/cases", middleWaresList);
};
