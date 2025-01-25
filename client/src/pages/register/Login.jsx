import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Login = () => {

    const { currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    /*===========================================*/

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            dispatch(loginUser({ email, password }));

        } catch (error) {

            setErrorMsg(error.response.data.message);

        }
    };

    /*===========================================*/

    /*
    if there is an user register navigate him to home page,
    other wise navigate him to login page depend when user 
    changed
    */
    useEffect(() => {

        if (currentUser) {

            navigate("/");

        } else {

            navigate("/login");

        }

    }, [currentUser, navigate]);

    /*===========================================*/

    return (
        <div className="my-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-center" style={{ color: "var(--light-white)" }}>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{ color: "#ff6868" }}
                    >Signup Now</Link>
                </p>
                <button type="submit">
                    {loading
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
                        "Sign In"
                    }
                </button>
            </form>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default Login;