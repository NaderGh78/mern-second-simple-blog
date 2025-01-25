import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        post: null,
        loading: false,
        isPostCreated: false,
        isPostEdited: false,
    },
    reducers: {

        // for all posts
        setPosts(state, action) {
            state.posts = action.payload;
            state.loading = false;
        },

        // for single post
        setPost(state, action) {
            state.post = action.payload;
        },

        removePost(state, action) {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },

        /*=========================== All Post Loading ===========================*/

        // show isPostCreated loading when create post
        setIsPostCreated(state) {
            state.isPostCreated = true;
        },

        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },

        // hide isPostCreated loading when create post finish
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        },

        // show isPostEdited loading when edit post
        setIsPostEdited(state) {
            state.isPostEdited = true;
        },

        // hide isPostEdited loading when edit post finish
        clearIsPostEdited(state) {
            state.isPostEdited = false;
        },
    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;
export { postActions, postReducer }