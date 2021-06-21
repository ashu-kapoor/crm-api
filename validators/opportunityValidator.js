const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");

const stageEnum = Object.freeze({
  PROSPECTING:"PROSPECTING", 
  APPLICATION:"APPLICATION", 
  CLOSED_WON:"CLOSED_WON", 
  CLOSED_LOST: "CLOSED_LOST", 
  CENCEL:"CENCEL"
});



module.exports.validateCreateOpportunity = (req, res, next) => {

  const name= req.body.name,
  const stage= req.body.stage,
  const products= req.body.products,
  const closeDate= req.body.closeDate,
  const owner= req.body.owner,
  const customer= req.params.contactId,
  const description = req.body.description;

  

  validateOpportutniy([{ name }, { stage }, { closeDate }, { owner }, {customer}], products, description);

  next();
};

module.exports.validateUpdateOpportunity = (req, res, next) => {
  const name= req.body.name,
  const stage= req.body.stage,
  const products= req.body.products,
  const closeDate= req.body.closeDate,
  const customer= req.params.contactId,
  const description = req.body.description;

  validateOpportutniy([{ name }, { stage }, { closeDate }, {customer}], products, description);

  next();
};

function validateOpportutniy(validationArray, products, description) {
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
      } else if ((key === "owner" || key === "customer") && !mongoose.isValidObjectId(value)) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = key;
        throw error;
      } else if (key === "closeDate" && !!moment(value, [moment.ISO_8601], true).isValid()) {
        
          const error = new Error();
          error.apiErrorCode = 1600;
          error.apiData = key;
          throw error;
        
      }
    });
  });

  //products
  if (
    _.isEmpty(products) ||
    !_.isArray(products)
  ) {

    products.forEach(add=>{
      if(!mongoose.isValidObjectId(value)){
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = "products";
        throw error;
      }
    })
    
  }

  //description optional
  if (!_.isEmpty(description) && !_.isString(description)) {
    const error = new Error();
    error.apiErrorCode = 1600;
    error.apiData = "description";
    throw error;
  }
}
