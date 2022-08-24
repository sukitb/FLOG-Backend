const express = require("express");
const ActivityModel = require("../models/activity");
const PostModel = require("../models/post")
const UserModel = require("../models/user")

const router = express.Router();

// get activity not contain 
router.get("/", async (req, res) => {
  const { userId } = req.session
  const activities = await ActivityModel.find({$and: [{user: userId}, { post: []}]});
  res.send(activities.map((act) => act.toJSON()));
});


// add activity
router.post("/", async (req, res) => {
  const { userId } = req.session
  const user = await UserModel.findById(userId);
  const { title, image, hours, duration, createActivityAt, youtubeUrl } = req.body;
  const activity = new ActivityModel({title, image, hours, duration,createActivityAt, youtubeUrl})
  user.activity.push = activity
  activity.user = user;
  res.send(`success`);
  await user.save()
  await activity.save()
  
});

// add post
router.post("/:activityId/post", async (req, res) => {
  const activityId = req.params.activityId;
  console.log(activityId)
  const activity = await ActivityModel.findById(activityId);
  const { postContent, createPostAt } = req.body;
  const post = new PostModel({ postContent, createPostAt })
  activity.post.push(post)
  post.activity = activity;
  res.send(post.toJSON());
  await activity.save()
  await post.save()
});


// get post
router.get('/post', async (req, res) => {
  const { userId } = req.session
  const activities = await ActivityModel.find(
    {$and: [{user: userId}, {post: {$ne : []}}]}
    ).populate('post')
  res.send(activities.map((act) => act.toJSON()));
})

//edit activity
router.put("/:activityId/edit", async (req, res) => {
  const payload = req.body;
  const activityId = req.params.activityId;
  const activity = await ActivityModel.findByIdAndUpdate(activityId, payload);
  if (!activity) {
    res.status(404).end();
  } else {
    res.send("activity updated");
  }
});

//delete activity
router.delete("/:activityId/delete", async (req, res) => {
  const activityId = req.params.activityId;
  const deleted = await ActivityModel.findByIdAndDelete(activityId);
  if (deleted === null) {
    res.status(404).end();
  } else {
    res.send("activity deleted");
  }
});

module.exports = router;
