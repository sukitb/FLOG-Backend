const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
  postContent: { type: String },
  createPostAt: { type: Date },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'activity'
  }
});

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel