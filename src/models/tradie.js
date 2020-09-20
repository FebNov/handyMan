const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  workTime: {
    type: Boolean,
    required: true,
    default: true,
  },
  PostCode: {
    type: String,
    default: "4000 ",
  },
  description: {
    type: String,
    default: "lastName ",
  },
  user: { type: [{ type: String, ref: "User" }], select: false },
});

const Model = mongoose.model("Tradie", schema);

module.exports = Model;
