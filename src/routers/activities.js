const express = require("express");
const ActivityModel = require("../models/activity");

const router = express.Router();

const getUserId = (req) => {
  return "mock-user-id";
};

// prefix '/activities'

router.get("/", async (req, res) => {
  const userId = getUserId(req);
  const activities = await ActivityModel.find({ userId: userId });
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
router.put("/:activityId", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const activityId = req.params.activityId;
  const post = await ActivityModel.findByIdAndUpdate(activityId, {
    $push: { postInfo: payload },
  });
  res.send(post.toJSON());
});

//find each activity
router.get("/:activityId", async (req, res) => {
  console.log(req.params);
  const activityId = req.params.activityId;
  const activity = await ActivityModel.findById(activityId);
  if (!activity) {
    res.status(404).end();
  }
  res.send(activity.toJSON());
});

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
