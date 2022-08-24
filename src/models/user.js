const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  name: {type: String},
  lastname: {type: String},
  email: {type: String},
  avatar: {type: Number},
  activity: [{
    type: Schema.Types.ObjectId,
    ref: 'activity'
  }],
  post : {
    type: Schema.Types.ObjectId,
    ref: 'post'
  }
});

const UserModel = mongoose.model("user", userSchema);

// userSchema.pre('save', function(next) {
  // bcrypt.hash(this.password, 10, function (err, hash) {
  //   this.password = hash(this.password);
  // });

//   this.password = bcrypt.hash(this.password, 10, function (err, hash) {return hash})
// })

module.exports = UserModel;

