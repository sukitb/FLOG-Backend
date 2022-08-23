const express = require("express");
const ActivityModel = require("../models/activity");
const PostModel = require("../models/post")

const router = express.Router();

// const getUserId = (req) => {
//   return "mock-user-id";
// };

// prefix '/activities'

router.get("/", async (req, res) => {
  // const userId = getUserId(req);
  const activities = await ActivityModel.find( { post: []} );
  res.send(activities.map((act) => act.toJSON()));
  
});

// add activity
router.post("/", async (req, res) => {
  const activity = new ActivityModel(req.body);
  const validateResult = activity.validateSync();
  if (validateResult) {
    return res.status(400).send(validateResult);
  }
  await activity.save();
  return res.send(activity.toJSON());
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

//find each activity
router.get("/post", async (req, res, next) => {
  console.log(req.params);
  const activityId = req.params.activityId;
  const activity = await ActivityModel.findById(activityId).findOne(postInfo)
  
});

// get post
// //todo still can't next to this function
router.get('/:activityId/', async (req, res) => {
  const activity = await ActivityModel.findById(req.params.activityId).populate('post')
  res.send(activity.toJSON())
})

//edit activity
router.put("/:activityId", async (req, res) => {
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
router.delete("/:activityId", async (req, res) => {
  const activityId = req.params.activityId;
  const deleted = await ActivityModel.findByIdAndDelete(activityId);
  if (deleted === null) {
    res.status(404).end();
  } else {
    res.send("activity deleted");
  }
});

module.exports = router;
