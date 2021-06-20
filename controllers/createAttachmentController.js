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

module.exports.createAttachmentController = (req, res, next) => {
  const contactId = req.params.contactId;
  const path = req.file.path;
  const name = req.body.note;

  const attachmentObject = {
    name,
    path,
  };

  Contact.findOneAndUpdate(
    { _id: contactId },
    { $push: { attachments: attachmentObject } }
  )
    .then((data) => {
      if (!data) {
        const error = new Error();
        error.apiErrorCode = 7000;
        throw error;
      }
      res.status(201).json({ id: req.file.filename.split("_")[0] });
    })
    .catch((err) => {
      if (!err.apiErrorCode) {
        err.apiErrorCode = 1000;
      }
      next(err);
    });
};
