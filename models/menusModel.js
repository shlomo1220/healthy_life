const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
    name: String,
    products: Array,
    date_crate: {
        type: Date, default: Date.now
    },
    user_id: String,
    pic: String,
})
exports.MenuModel = mongoose.model("menus", schema)

exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        products: Joi.array().min(2).max(50).required(),
        user_id: Joi.array().min(2).max(50).required(),
        pic: Joi.string().min(1).max(999),
    })
    return joiSchema.validate(_reqBody)
}