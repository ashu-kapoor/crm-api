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
      type: [{ type: Schema.ObjectId, ref: "Product" }],
      required: true,
    },
    closeDate: { type: Date, required: true },
    owner: { type: Schema.ObjectId, ref: "User", required: true },
    customer: { type: Schema.ObjectId, ref: "Contact", required: true },
  },
  { autoCreate: false }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
