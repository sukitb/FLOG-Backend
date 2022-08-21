const express = require("express");
const UserModel = reuire("../models/user.js")
const router = express.Router();


router.get('/', async (req, res) => {
    const userInfo = await UserModel.find({
        
    })
})