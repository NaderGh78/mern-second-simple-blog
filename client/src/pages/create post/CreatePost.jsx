import './create-post.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const CreatePost = () => {

    const dispatch = useDispatch();

    const { isPostCreated } = useSelector((state) => state.post);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    /*===========================================*/

    // create post handler
    const createPostHandler = async (e) => {

        e.preventDefault();

        const response = await dispatch(createPost({ title, description }));

        // Check if post creation was successful
        if (response?.message === "Post Created Successfully") {

            // Clear the form on success
            setTitle("");

            setDescription("");

            toast.success(response?.message);

        } else {

        }

    };

    /*===========================================*/

    return (
        <div className="my-form">
            <form onSubmit={createPostHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Post Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="msg" className="form-label">Post Content</label>
                    <textarea
                        id="msg"
                        rows="4"
                        name="msg"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="d-flex justify-content-center mx-auto">
                    {isPostCreated
                        ?
                        <>
                            <div
                                className="spinner-border"
                                style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                        :
                        "Create"
                    }
                </button>
            </form>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default CreatePost;