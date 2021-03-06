const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  photo: {
    type: String
  },
  description: {
    type: String
  },
  title: {
    type: String
  },
  blogID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  }
});

module.exports = mongoose.model("Page", pageSchema);
