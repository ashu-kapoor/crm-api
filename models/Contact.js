const mongoose = require("mongoose");
const schema = mongoose.Schema;

const addressSchema = new schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  { autoCreate: false }
);

const attachmentsSchema = new schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
  },
  { autoCreate: false }
);

const contactSchema = new schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Ms", "Miss"],
    },
    birthdate: { type: String, required: false },
    department: { type: String, required: false },
    address: { type: [addressSchema], required: false },
    phone: { type: String, required: true },
    owner: { type: Schema.ObjectId, ref: "User", required: true },
    cases: {
      type: [{ type: Schema.ObjectId, ref: "Case" }],
      required: false,
    },
    opportunities: {
      type: [{ type: Schema.ObjectId, ref: "Opportunity" }],
      required: false,
    },

    attachments: { type: [attachmentsSchema], required: false },
  },
  { timestamps: true, autoCreate: false }
);

module.exports = mongoose.model("Contact", contactSchema);
