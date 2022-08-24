const express = require("express");
const UserModel = require("../models/user.js");
const router = express.Router();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");

router.use(
  session({
    secret: "",
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    resave: false,
    store: MongoStore.create({
      mongoUrl:
        "",
    }),
  })
);

//register
router.post("/register", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10, function (err, hash) {
    });
  const newUser = new UserModel(req.body);
  await newUser.save();
  return res.send(newUser.toJSON());
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //check password
  const user = await UserModel.findOne({ username });
  console.log();
  if (!user || user.password !== password) {
    res.status(401).send("get out ! stranger");
  }
  req.session.userId = user._id;
  return res.json(user.toJSON());
});

module.exports = router;
