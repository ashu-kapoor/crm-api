const mongoose = require("mongoose");
const schema = mongoose.Schema;

const caseSchema = new schema(
  {
    caseNumber: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    description: { type: String, required: true },
    stage: {
      type: String,
      required: true,
      enum: ["NEW", "WORKING", "ESCALATED"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["HIGH", "MEDIUM", "LOW"],
    },
    owner: { type: Schema.ObjectId, ref: "User", required: true },
    customer: { type: Schema.ObjectId, ref: "Contact", required: true },
  },
  { autoCreate: false }
);

module.exports = mongoose.model("Case", caseSchema);
