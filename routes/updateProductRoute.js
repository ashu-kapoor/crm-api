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

const {
  updateProductController,
} = require("../controllers/updateProductController");

module.exports.updateProduct = (app, middlewares, validator = null) => {
  const middleWaresList = [];
  if (middlewares && lodash.isArray(middlewares)) {
    middlewares.forEach((middleware) => {
      if (lodash.isFunction(middleware)) {
        middleWaresList.push(middleware);
      } else {
        throw new Error("Middleware not function " + updateProductRoute);
      }
    });
  }

  if (validator && lodash.isFunction(validator)) {
    middleWaresList.push(validator);
  } else if (validator) {
    throw new Error("Validator not function " + updateProductRoute);
  }
  middleWaresList.push(updateProductController);
  app.put("/crm/v1/products/:productId", middleWaresList);
};
