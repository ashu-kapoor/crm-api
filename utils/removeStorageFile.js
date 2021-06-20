const path = require("path");
const fs = require("fs");

module.exports = (filepath) => {
  filepath = path.join(__dirname, "..", filepath);
  fs.unlink(filepath, (err) => {});
};
