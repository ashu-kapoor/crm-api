const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    listPrice: { type: mongoose.Types.Decimal128, required: true },
  },
  { autoCreate: false }
);

module.exports = mongoose.model("Product", productSchema);
