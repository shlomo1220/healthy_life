const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {auth} = require("../middlewares/auth");
const { UserModel, validateUser, validateLogin,createToken } = require("../models/usersModel")

router.get("/:userId",auth, async (req, res) => {
  
  
 if(req.params.userId != req.tokenData._id){
  return res.status(502).json("token and id not match")
 }
  
  try {
    // let data = await UserModel.find({});
    let userInfo = await UserModel.findOne({_id:req.params.userId});
    userInfo.password ="*****"
    res.status(200).json(userInfo);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/signUp", async (req, res) => {
  let validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();
    user.password = "*****";
    res.status(201).json(user);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/signIn", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {

    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({msg:"wrong email or password"})
    }

    let validPass = await bcrypt.compare(req.body.password , user.password);
    if(!validPass){
      return res.status(401).json({msg:"wrong p or password"})
    }

    const token = createToken(user._id , user.role);

    res.status(201).json(token);
    }

  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


module.exports = router;