const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
title:String,
info:String,
user_id:String,
menu_id:String,
date:Number,
})
exports.Model = mongoose.model("s",schema)

exports.validateJoi = (_reqBody) => {
let joiSchema = Joi.object({
title:Joi.string().min(2).max(50).required(),
info:Joi.string().min(2).max(850).required(),
menu_id:Joi.string().min(1).max(50).required(),
})
return joiSchema.validate(_reqBody)
}