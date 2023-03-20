const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


let schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: {
        type: Date, default: Date.now
    },
    groups:{
         type:Array ,default:[]
        },
    role: {
        type: String, default: "user"
    }
})
exports.UserModel = mongoose.model("users", schema)

exports.createToken = (user_id, role) => {
    let token = jwt.sign({ _id: user_id, role}, "Shlomo", { expiresIn: "60000mins" })
    return token;
}

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(10).max(50).required(),
        password: Joi.string().min(8).max(20).required(),
    })
    return joiSchema.validate(_reqBody)
}

exports.validateLogin = (_reqBody) =>{
    let joiSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return joiSchema.validate(_reqBody)
}
