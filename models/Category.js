const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  //   categoryName: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  name: String,
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("category", categorySchema);
