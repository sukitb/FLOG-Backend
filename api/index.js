const express = require('express');
const { default: mongoose } = require("mongoose");
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('../config');
const PORT = config.port;

//router
const activityRouter = require('../src/routers/activities');
const userRouter = require('../src/routers/users')

const app = express();

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongodb.mongoUrl);
      return next();
    });
  }

  app.use(bodyParser.json());

  app.use(
    cors({
      origin: ['http://localhost:5173', 'https://offit.vercel.app/'],
      credentials: true,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

app.set('trust proxy', true)
app.use(express.json())
app.use(morgan('dev'))
app.use("/users", userRouter)

module.exports = app;
