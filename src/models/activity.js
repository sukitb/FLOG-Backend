const mongoose = require("mongoose");
const PostModel = require("./post");
const { Schema } = mongoose;

const activitySchema = new mongoose.Schema({
  title: { type: String, min: 5, max: 20, required: true },
  youtubeUrl: { type: String },
  image: { type: Number, min: 0, max: 10, required: true },
  createActivityAt: { type: String, required: true },
  duration: { type: Number, required: true },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "post",
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const ActivityModel = mongoose.model("activity", activitySchema);

module.exports = ActivityModel;
