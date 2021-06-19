/****************
Generated by NODEBOOTSTRAPPER
Author: Ashutosh Kapoor
GIT LINK : https://github.com/ashu-kapoor/NODEBOOTSTRAPPER
****************/
const Contact = require("../models/Contact");
/**
 * @param {object} req - req object
 * @param {object} res - res object
 * @param {object} next - next object
 **/

module.exports.updateContactController = (req, res, next) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const title = req.body.title;
  const birthdate = req.body.birthdate;
  const department = req.body.department;
  const address = req.body.address;
  const phone = req.body.phone;
  const owner = req.body.owner;
  const contactId = req.params.contactId;

  const contactObject = Object.assign(
    { name, gender, title, address, phone, owner },
    department === null ? null : { department },
    birthdate === null ? null : { birthdate: new Date(birthdate) }
  );

  Contact.findOneAndUpdate({ _id: contactId }, contactObject)
    .then((data) => {
      if (!data) {
        const error = new Error();
        error.apiErrorCode = 7000;
        throw error;
      }
      res.status(204).send();
    })
    .catch((err) => {
      if (!err.apiErrorCode) {
        err.apiErrorCode = 1000;
      }
      next(err);
    });
};
