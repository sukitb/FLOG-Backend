const express = require('express');
const { default: mongoose } = require("mongoose");
const morgan = require('morgan')
const config = require('./config')
const cors = require('cors')

//router
const activityRouter = require('./src/routers/activities');
const userRouter = require('./src/routers/users')

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use("/", userRouter)
app.use("/activities", activityRouter);

//middlewares


const start = async () => {
  await mongoose.connect(config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    retryWrites: true,
  }
  );
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

start();
