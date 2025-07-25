const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: [String], // or use [ObjectId] if referencing users
    default: []
  }
});

module.exports = mongoose.model("Post", postSchema);
