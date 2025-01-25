import './home.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../redux/apiCalls/postApiCall';
import { CardPost } from '../../allPagesPaths';
import MySpinner from '../../components/helper/my spinner/MySpinner';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Home = () => {

    const dispatch = useDispatch();

    const { posts, loading } = useSelector((state) => state.post);

    /*===========================================*/

    useEffect(() => {

        dispatch(fetchAllPosts());

    }, []);

    /*===========================================*/

    if (loading) return <MySpinner />;
    return (
        <div className='all-posts' style={{ margin: "50px 0 150px" }}>
            <h2 className='text-center mb-5'>All Posts</h2>
            <div className="container">
                <div className="row">
                    {
                        posts?.map(post => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={post._id}>
                                <CardPost data={post} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;