import './post-edit.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost, updatePost } from '../../redux/apiCalls/postApiCall';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const PostEdit = () => {

    const dispatch = useDispatch();

    const { post, isPostEdited } = useSelector((state) => state.post);

    const { id } = useParams();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    /*=========================================*/

    /*
    change the [title,description],when post already changed ,
    in order to put them as an old values inside the inputs
    */
    useEffect(() => {

        setTitle(post?.title);

        setDescription(post?.description);

    }, [post]);


    useEffect(() => {

        dispatch(getSinglePost(id));

    }, [id]);

    const editPostHandler = async (e) => {

        e.preventDefault();

        // update post with data and post id
        dispatch(updatePost({ title, description }, post?._id));

    }

    /*=========================================*/

    return (
        <div className="my-form">
            <form onSubmit={editPostHandler}>
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
                    {isPostEdited
                        ?
                        <>
                            <div
                                className="spinner-border"
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderWidth: "2px",
                                    color: "#fff"
                                }}
                            >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                        :
                        "Update post"
                    }

                </button>
            </form>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default PostEdit;