const express = require("express");
const UserModel = require("../models/user.js");
const activityRouter = require('./activities');
const router = express.Router();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const config = require('../../config')

router.use(
  session({
    secret: config.secret,
    saveUninitialized: true,
    cookie: { sameSite: "none", secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: false,
    store: MongoStore.create({
      mongoUrl:config.mongodb.mongoUrl,
    }),
  })
);

//register

router.post("/register", async (req, res) => {
  const newUser = new UserModel(req.body);
  const existUsername = await UserModel.findOne({ username: req.body.username});
   if (existUsername) {
     console.log('username taken');
     return res.send('username taken')
   }
  bcrypt.hash(newUser.password, 10, async (err, hash) => {
    newUser.password = hash;
    console.log(newUser.password);
    await newUser.save();
    return res.send(newUser.toJSON());
  });
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).send("get out ! stranger");
  }
  const { password: hash } = user;
  console.log();
  bcrypt.compare(password, hash, function (err, result) {
    if (result !== true) {
      res.status(401).send("get out ! stranger");
    } else {
      req.session.userId = user._id;
      return res.json(user.toJSON());
    }
  });
});

const authMiddleware = async (req, res, next) => {
  const { userId } = req.session;
  console.log(req.session);
  if(!userId) {
    return res.status(401).send('Unautorized')
  }
  const user = await UserModel.findById(userId)
  if (!user) {
    return res.status(401).send('Unautorized')
  }
  req.user = user
  return next()
}

router.use(authMiddleware);

router.post('/logout', async (req, res) => {
  delete req.session.userId
  return res.end;
})



router.get('/me/profile', async (req, res)=> {
  return res.send(req.user.toJSON())
})

router.use('/me/activities', activityRouter);

module.exports = router;
