const mongoose = require("mongoose");
const schema = mongoose.Schema;

const opportunitySchema = new schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    stage: {
      type: String,
      required: true,
      enum: [
        "PROSPECTING",
        "APPLICATION",
        "CLOSED_WON",
        "CLOSED_LOST",
        "CENCEL",
      ],
    },
    products: {
      type: [{ type: schema.Types.ObjectId, ref: "Product" }],
      required: true,
    },
    closeDate: { type: Date, required: true },
    owner: { type: schema.Types.ObjectId, ref: "User", required: true },
    customer: { type: schema.Types.ObjectId, ref: "Contact", required: true },
  },
  { autoCreate: false }
);

module.exports = mongoose.model(
  "Opportunity",
  opportunitySchema,
  "Opportunity"
);
