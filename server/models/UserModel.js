const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
}, {
    timestamps: true
});

/*===========================================*/

// Generate Token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
}

// User Model
const UserModel = model("User", UserSchema, "User");

/*===========================================*/

// Validate Register User
function validateRegisterUser(obj) {

    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });

    return schema.validate(obj);

}

// Validate Login User
function validateLoginUser(obj) {

    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });

    return schema.validate(obj);

}

/*===========================================*/

module.exports = {
    UserModel,
    validateRegisterUser,
    validateLoginUser
} 