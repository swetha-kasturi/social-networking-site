const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: {
    type: String,
    default: "/images/default.png"
  }
});

module.exports = mongoose.model("User", userSchema);
