import { postActions } from "../slices/postSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Create Post  
export function createPost(newPost) {

    return async (dispatch, getState) => {

        try {

            // Start loading
            dispatch(postActions.setIsPostCreated());

            const { data } = await request.post(`/api/post`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.currentUser.token,
                },
            });

            dispatch(postActions.setPosts([data]));

            // End loading
            dispatch(postActions.clearIsPostCreated());

            return data;

        } catch (error) {

            // Handle error
            dispatch(postActions.clearIsPostCreated());

            toast.error(error?.response?.data?.message || "Failed to create post.");

            return null;

        }
    };
}

/*===========================================*/

// Get All Posts
export function fetchAllPosts() {

    return async (dispatch) => {

        dispatch(postActions.setLoading());

        try {

            // get all posts for admin dashbord WITHOUUUUUUT [page number provided]
            const { data } = await request.get(`/api/post`);

            dispatch(postActions.setPosts(data));


        } catch (error) {

            toast.error(error.response.data.message);

        } finally {
            dispatch(postActions.clearLoading());
        }

    }
}

/*===========================================*/

// Get Single Post  
export function getSinglePost(postId) {

    return async (dispatch) => {

        dispatch(postActions.setLoading());

        try {

            // get single post based on post id provided
            const { data } = await request.get(`/api/post/${postId}`);

            dispatch(postActions.setPost(data));

        } catch (error) {

            console.log(error.response.data.message);

        } finally {

            dispatch(postActions.clearLoading());

        }

    }
}

/*===========================================*/

// Delete Post  
export function deletePost(PostId) {

    return async (dispatch, getState) => {

        try {

            // delete post, need post id and token for admin to delete some post
            const { data } = await request.delete(`/api/post/${PostId}`,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.currentUser.token
                    },
                }
            );

            dispatch(postActions.removePost(PostId));

            // show success toast when post deleted succesfully
            toast.success("psot deleted successfully");

        } catch (error) {

            console.log(error?.response?.data?.message);

        }

    }
}

/*===========================================*/

// Update Post
export function updatePost(editPost, postId) {

    return async (dispatch, getState) => {

        try {

            // run the loader
            dispatch(postActions.setIsPostEdited());

            /*
            update a new post based on 
            [post content + token for logged user or admin + formdata for upload post img]
            */
            const { data } = await request.put(`/api/post/${postId}`, editPost,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.currentUser.token
                    }
                },

            );

            dispatch(postActions.setPost(data));

            dispatch(postActions.clearIsPostEdited());

            //show success toast in case update post succefully 
            toast.success("Post Updated Successfully,Please Go Home");

        } catch (error) {

            toast.error(error?.response?.data?.message);

            dispatch(postActions.clearIsPostEdited());

        }

    }
}