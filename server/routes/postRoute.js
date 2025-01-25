const router = require("express").Router();
const {
    getAllPostsCtrl,
    newPostCtrl,
    getPostCtrl,
    updatePostCtrl,
    deletePostCtrl
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");

/*===========================================*/
/*===========================================*/
/*===========================================*/

// /api/post
router.route("/")
    .get(getAllPostsCtrl)
    .post(verifyToken, newPostCtrl);

/*===========================================*/

// /api/post/:id
router.route("/:id")
    .get(getPostCtrl)
    .put(validateObjectId, verifyToken, updatePostCtrl)
    .delete(verifyToken, deletePostCtrl);

/*===========================================*/

module.exports = router;