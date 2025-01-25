import './post.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../../redux/apiCalls/postApiCall';
import MySpinner from '../../components/helper/my spinner/MySpinner';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Post = () => {

    const dispatch = useDispatch();

    const { post, loading } = useSelector((state) => state.post);

    const { id } = useParams();

    /*=========================================*/

    // get single post by id
    useEffect(() => {

        dispatch(getSinglePost(id));

    }, [id]);

    /*=========================================*/

    if (loading) return <MySpinner />;
    return (
        <div className='post-details'>
            <div className="card text-center mb-4" style={{ width: "70%" }}>
                <div className="card-body">
                    <h5 className="card-title">{post?.title}</h5>
                    <p className="card-text">
                        {post?.description}
                    </p>
                    <h6>created by : <span className='text-success text-capitalize'>{post?.user?.username}</span></h6>
                </div>
            </div>
        </div>
    )
}

export default Post;