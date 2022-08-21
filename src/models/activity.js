const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postContent: { type: String},
  createPostAt: { type: Date},
});

const activitySchema = new mongoose.Schema({
  title: { type: String, min: 5, max: 20, required: true },
  youtubeUrl: String,
  image: { type: String, min: 0, max: 10000, required: true },
  createActivityAt: { type: Date, required: true },
  duration: { type: Number, required: true },
  postInfo: postSchema
});

// const activitySchema = new mongoose.Schema({
//   title: {type: String, required: true}
// })

const ActivityModel = mongoose.model("activity", activitySchema);


module.exports = ActivityModel;
