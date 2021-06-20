/****************
Generated by NODEBOOTSTRAPPER
Author: Ashutosh Kapoor
GIT LINK : https://github.com/ashu-kapoor/NODEBOOTSTRAPPER
****************/
const Contact = require("../models/Contact");
const User = require("../models/User");
/**
 * @param {object} req - req object
 * @param {object} res - res object
 * @param {object} next - next object
 **/

module.exports.createContactController = (req, res, next) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const title = req.body.title;
  const birthdate = req.body.birthdate;
  const department = req.body.department;
  const address = req.body.address;
  const phone = req.body.phone;
  const owner = req.body.owner;

  User.findById(owner, { _id: 1 })
    .then((data) => {
      if (!data) {
        const error = new Error();
        error.apiErrorCode = 1600;
        error.apiData = "owner";
        throw error;
      }
      const contactObject = Object.assign(
        { name, gender, title, address, phone, owner },
        department === null ? null : { department },
        birthdate === null ? null : { birthdate: new Date(birthdate) }
      );

      const contact = new Contact(contactObject);

      contact
        .save()
        .then((result) => {
          res.status(201).json({
            id: result._id,
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      if (!err.apiErrorCode) {
        err.apiErrorCode = 1000;
      }
      next(err);
    });
};
