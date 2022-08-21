const express = require('express');
const { default: mongoose } = require("mongoose");
const morgan = require('morgan')
const config = require('./config')

//router
const activityRouter = require('./src/routers/activities');



const app = express();
const PORT = 8080;

app.use(express.json())
app.use(morgan('dev'))
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
