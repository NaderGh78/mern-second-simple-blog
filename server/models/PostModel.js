const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const joi = require("joi");

/*===========================================*/
/*===========================================*/
/*===========================================*/

PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
);

/*===========================================*/

// new post validation func
function newPostValidation(obj) {

    const shema = joi.object({
        title: joi.string().trim().min(5).max(100).required(),
        description: joi.string().trim().min(5).required()
    });

    return shema.validate(obj);

}

/*===========================================*/

// update post validation func
function updatePostValidation(obj) {

    const shema = joi.object({
        title: joi.string().trim().min(5).max(100),
        description: joi.string().trim().min(5)
    });

    return shema.validate(obj);

}

/*===========================================*/

// create Post model
const PostModel = model("Post", PostSchema, "Post");

module.exports = {
    PostModel,
    newPostValidation,
    updatePostValidation
} 