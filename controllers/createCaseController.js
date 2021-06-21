/****************
Generated by NODEBOOTSTRAPPER
Author: Ashutosh Kapoor
GIT LINK : https://github.com/ashu-kapoor/NODEBOOTSTRAPPER
****************/

const Case = require("../models/Case");
const Contact = require("../models/Contact");
const mongoose = require("mongoose");
const User = require("../models/User");

/**
 * @param {object} req - req object
 * @param {object} res - res object
 * @param {object} next - next object
 **/

module.exports.createCaseController = (req, res, next) => {
  //Opty will be created and contact updated
  const contactId = req.params.contactId;
  Contact.findById(contactId, "_id")
    .then((result) => {
      if (!result) {
        const customError = new Error();
        customError.apiErrorCode = 1600;
        customError.apiData = "contactId";
        throw customError;
      }

      const dbRequest = {
        caseNumber: req.body.caseNumber,
        description: req.body.description,
        stage: req.body.stage,
        priority: req.body.priority,
        owner: req.body.owner,
        customer: result._id,
      };

      User.findById(req.body.owner)
        .then((data) => {
          if (!data) {
            const error = new Error();
            error.apiErrorCode = 1600;
            error.apiData = "owner";
            throw error;
          }

          //save Case and update contact as a transaction
          createUpdateCase(dbRequest, res)
            .then((data) => {
              if (data.isError) {
                const error = new Error("Creation failed");
                error.apiErrorCode = 1000;
              } else {
                return res.status(201).json({
                  id: data.id,
                });
              }
            })
            .catch((err) => {
              if (!err.apiErrorCode) {
                err.apiErrorCode = 1000;
              }
              throw err;
            });
        })
        .catch((err) => throw err);
    })
    .catch((err) => {
      if (!err.apiErrorCode) {
        err.apiErrorCode = 1000;
      }
      next(err);
    });
};

const createUpdateCase = async function (caseObject, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  let isError = false;
  const newCase = new Case(caseObject);
  try {
    await newCase.save({ session });
    await Contact.findOneAndUpdate(
      { _id: caseObject.customer },
      { $addToSet: { cases: newCase._id } },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    isError = true;
    await session.abortTransaction();
  } finally {
    session.endSession();
  }

  return { id: newCase._id, isError };
};
