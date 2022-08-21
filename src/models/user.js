const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  lastName: String,
  weight: Number,
  height: Number,
  avatar: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
