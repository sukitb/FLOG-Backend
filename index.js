const mongoose = require("mongoose");
const app = require("./api/index");

const config = require("./config");

const start = async () => {
  await mongoose.connect(config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    retryWrites: true,
  });
  app.listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`);
  });
};

start();
