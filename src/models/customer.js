const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    default: true,
  },
  ContactNo: {
    type: String,
    default: "firstName ",
  },
  createdAt: {
    type: Date,
    select: false,
  },
  users: { type: [{ type: String, ref: "User" }], select: false },
});

const Model = mongoose.model("Customer", schema);

module.exports = Model;
