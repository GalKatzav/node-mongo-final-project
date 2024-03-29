const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("category", categorySchema);
