const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const { MenuModel, validateMenuRegistered } = require("../models/menusModel")

router.get("/", async(req,res) => {
  try{
    let data = await MenuModel.find({}).limit(20);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/:userId", async(req,res) => {
  let validBody = validateMenuRegistered(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }

  try{
    let menu = new MenuModel(req.body);
    menu.user_id = req.params.userId;
    await menu.save();
    res.status(201).json(menu);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


module.exports = router;