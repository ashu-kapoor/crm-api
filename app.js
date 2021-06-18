/****************
Generated by NODEBOOTSTRAPPER
Author: Ashutosh Kapoor
GIT LINK : https://github.com/ashu-kapoor/NODEBOOTSTRAPPER
****************/

const { loadApp } = require("./loadApp");
const routes = require("./routes");

//by default register all routes
//Routes to register, Array of custom middlewares to be applied to all routes
//and options and dbconnection promise

//Please update the follwing call with your code

const routesArray = [
  {
    method: routes.createUserRoute.createUser,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getUsersRoute.getUsers,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getUserRoute.getUser,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.updateUserRoute.updateUser,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.deleteUserRoute.deleteUser,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.createProductRoute.createProduct,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getProductsRoute.getProducts,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getProductRoute.getProduct,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.updateProductRoute.updateProduct,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.deleteProductRoute.deleteProduct,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.createContactRoute.createContact,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getContactsRoute.getContacts,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getContactRoute.getContact,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.updateContactRoute.updateContact,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.deleteContactRoute.deleteContact,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.createOpportunityRoute.createOpportunity,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getOpportunitiesRoute.getOpportunities,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getOpportunityRoute.getOpportunity,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.updateOpportunityRoute.updateOpportunity,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.deleteOpportunityRoute.deleteOpportunity,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getAllOptiesRoute.getAllOpties,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.createCaseRoute.createCase,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getCasesRoute.getCases,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.updateCaseRoute.updateCase,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.deleteCaseRoute.deleteCase,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getCaseRoute.getCase,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
  {
    method: routes.getAllCasesRoute.getAllCases,
    validatorFn: null,
    routeSpecificMiddlewares: null,
  },
];

const options = {
  useNoCache: true,
  allowCORSOrigin: "*",
  multiparserConfig: null,
  port: 8080,
  useJsonParser: true,
  useUrlEncodedParser: false,
};

/**
 * @param {array} routesArray - routesArray to register
 * @param {array} customMiddlewares - array of custom middlewares to be applied to this route
 * @param {object} options - options object deafault value are : {useNoCache:true, allowCORSOrigin:'*', multiparserConfig=null, port=8080}, dbConnectionPromise=null)
 * @param {object} dbConnectionPromise - promise if connection to DB on which to start server
 **/
loadApp(routesArray, [], options, null);