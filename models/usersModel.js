const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


let schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    date: {
        type: Date, default: Date.now
    },
    groups: Array,
    role: {
        type: String, default: "user"
    }
})
exports.UserModel = mongoose.model("users", schema)

exports.createToken = (user_id, role) => {
    let token = jwt.sign({ _id: worker_id, role, user_name }, "carsSecret", { expiresIn: "600mins" })
    return token;
}

exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(10).max(50).required(),
        phone: Joi.string().min(9).max(12).required(),
        password: Joi.string().min(8).max(20).required(),
        groups: Joi.array().min(0).max(999).required(),
    })
    return joiSchema.validate(_reqBody)
}