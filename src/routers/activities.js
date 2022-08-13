const express = require("express");
// wait for schema
const router = express.Router();


//route
router.get("/", (req, res) => {
res.send('get success')

});

