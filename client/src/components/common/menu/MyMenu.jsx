import './my-menu.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/*=========================================*/
/*=========================================*/
/*=========================================*/

const MyMenu = () => {

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { currentUser } = useSelector((state) => state.auth);

    /*=========================================*/

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ borderBottom: "var(--border)" }}>
            <Container>
                <Navbar.Brand as={Link}
                    to={"/"}>Joori Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to={"/"}
                            className={pathname === "/" ? "active" : ""}
                        >Home</Nav.Link>
                        {
                            currentUser ?
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to={"/create"}
                                        className={pathname === "/create" ? "active" : ""}
                                    >Create</Nav.Link>
                                </> : ""
                        }
                        {
                            currentUser ?
                                <>
                                    <Nav.Link>{currentUser?.username}</Nav.Link>
                                </> :
                                ""
                        }
                        {
                            !currentUser ?
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to={"/login"}
                                        className={pathname === "/login" ? "active" : ""}
                                    >Register/Login</Nav.Link>
                                </> :
                                <>
                                    <Nav.Link
                                        as={Link}
                                        onClick={() => dispatch(logoutUser())}
                                    >Logout</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyMenu;