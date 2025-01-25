const asynHandler = require("express-async-handler");
const {
    PostModel,
    newPostValidation,
    updatePostValidation
} = require("../models/PostModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 * @desc add new post
 * @route /api/post
 * @method Post
 * @access private (only logged user and admin) 
*/

const newPostCtrl = asynHandler(

    async (req, res) => {

        const { title, description } = req.body;

        // 1. validation
        const { error } = newPostValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. get post with same title
        let post = await PostModel.findOne({ title: req.body.title });

        // 3. show error msg in case the post title already exists
        if (post) {
            return res.status(400).json({ message: "Post Title Already Exist." });
        }

        // 5. create new post
        post = await PostModel.create({
            title,
            description,
            user: req.userDecoded.id
        });

        // 6. send response to client
        res.status(201).json({ message: "Post Created Successfully", post });

    }
);

/*===========================================*/

/**
 * @desc get all posts
 * @route /api/post
 * @method Get
 * @access private (only logged user and admin) 
*/

const getAllPostsCtrl = asynHandler(

    async (req, res) => {

        /*
        find all post and populate the user and select the username
         in order to put the name of who create the post
        */
        const posts = await PostModel.find().populate({
            path: "user",
            select: "username"
        });

        res.status(200).json(posts);
    }
);

/*===========================================*/

/**
 * @desc get post
 * @route /api/post/:id
 * @method Get
 * @access private (only logged user and admin)  
*/
const getPostCtrl = asynHandler(

    async (req, res) => {

        /*
         get single post with id , populate the user and select the username
         in order to put the name of who create the post
        */

        const post = await PostModel.findById(req.params.id).populate({
            path: "user",
            select: "username"
        });

        // 2. check if post exist show it , otherwise show not found post
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post Not Found." });
        }

    }
);

/*===========================================*/

/**
 * @desc update post 
 * @route /api/post/:id
 * @method Put
 * @access private (only logged user and admin)
*/
const updatePostCtrl = asynHandler(

    async (req, res) => {

        // 1. validation
        const { error } = updatePostValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. update the category
        const post = await PostModel.findByIdAndUpdate(
            req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
            }
        }, { new: true });

        // 3. send response to client
        res.status(200).json({ message: "Post updated successfully." })
    }

);

/*===========================================*/

/**
 * @desc delete post 
 * @route /api/post/:id
 * @method Delete
 * @access private (only logged user and admin) 
*/
const deletePostCtrl = asynHandler(

    async (req, res) => {

        // 1. get the post from db
        const post = await PostModel.findById(req.params.id);

        // 2. find the post and delete it,otherwise return msg the category not fond
        if (post) {

            await PostModel.findByIdAndDelete(req.params.id);

            res.status(200).json({
                message: "post has been deleted successfully",
                postId: post._id,
            });

        } else {

            res.status(404).json({ message: "post not found" });

        }
    }
);

/*===========================================*/

module.exports = {
    getAllPostsCtrl,
    newPostCtrl,
    getPostCtrl,
    updatePostCtrl,
    deletePostCtrl
}