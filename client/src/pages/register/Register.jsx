import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Register = () => {

    const dispatch = useDispatch();

    const { registerMessage, loading } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    /*===========================================*/

    // Form Submit Handler
    const formSubmitHandler = (e) => {

        e.preventDefault();

        dispatch(registerUser({ username, email, password }))

    }

    /*===========================================*/

    // in case there are a succefully register , show swal to navigate to login page
    if (registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if (isOk) {
                navigate("/login");
            }
        })
    }

    /*===========================================*/

    return (
        <div className="my-form">
            <form onSubmit={formSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                <p className="text-center">
                    Have an account?{" "}
                    <Link
                        to="/login"
                        style={{ color: "#ff6868" }}
                    >Login here</Link>
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
                        "Sign up"
                    }
                </button>
            </form>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default Register;