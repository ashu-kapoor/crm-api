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

const { getContactController } = require("../controllers/getContactController");

module.exports.getContact = (app, middlewares, validator = null) => {
  const middleWaresList = [];
  if (middlewares && lodash.isArray(middlewares)) {
    middlewares.forEach((middleware) => {
      if (lodash.isFunction(middleware)) {
        middleWaresList.push(middleware);
      } else {
        throw new Error("Middleware not function " + getContactRoute);
      }
    });
  }

  if (validator && lodash.isFunction(validator)) {
    middleWaresList.push(validator);
  } else if (validator) {
    throw new Error("Validator not function " + getContactRoute);
  }
  middleWaresList.push(getContactController);
  app.get("/crm/v1/contacts/:contactId", middleWaresList);
};
