const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true, autoCreate: false }
);

module.exports = mongoose.model("User", userSchema, "User");
