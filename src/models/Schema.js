const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postContent: { type: String, required: true },
  createPost: Date,
});

const activitySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, min: 5, max: 20, required: true },
  image: { type: String, required: true },
  youtube_url: String,
  duration: { type: Number, required: true }, // in second
  post: postSchema,
});

const ActivityModel = moongoose.model("activity", activitySchema);
module.exports = ActivityModel;
