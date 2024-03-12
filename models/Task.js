const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("task", schema);
