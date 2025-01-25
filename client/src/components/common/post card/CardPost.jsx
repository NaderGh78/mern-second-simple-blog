import './card-post.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/apiCalls/postApiCall';
import { FaRegEye, FaRegTrashCan, FaPen } from "react-icons/fa6";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const CardPost = ({ data: { _id, title, description, user } }) => {

    const { currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    /*=========================================*/

    const Delete = async (id) => {
        dispatch(deletePost(id));
    };

    // show confirm msg,when need to delete some post
    const handleDelete = async (id) => {
        confirmAlert({
            message: "Are you sure you want to delete this post?",
            buttons: [{
                label: 'Yes',
                onClick: () => Delete(id)
            },
            { label: 'No' }
            ]
        });
    }

    /*=========================================*/

    return (
        <div className="card text-center mb-4">
            <div className="card-body">
                <h5 className="card-title">{title?.length > 25 ? title?.slice(1, 50) + " ..." : title}</h5>
                <p className="card-text">
                    {description?.length > 30 ? description?.slice(1, 30) + " ..." : description}
                </p>
                <h6>created by : <span className='text-success text-capitalize'>{user?.username}</span></h6>
                <div className="box-flex">
                    <Link to={`/post/${_id}`} className="btn bg-info"><FaRegEye /></Link>
                    {/* show these btn just in case the post is belong to currentuser himself */}
                    {currentUser?._id === user?._id ?
                        <Link
                            to={`/post-edit/${_id}`}
                            className="btn bg-warning"
                        ><FaPen /></Link> : ""}
                    {currentUser?._id === user?._id ?
                        <button
                            className='bg-danger'
                            onClick={() => handleDelete(_id)}
                        ><FaRegTrashCan /></button> : ""}
                </div>
            </div>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default CardPost;