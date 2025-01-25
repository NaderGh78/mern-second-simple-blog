import { Outlet } from "react-router-dom";
import { Footer, MyMenu } from "../allPagesPaths";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const Layout = () => {
    return (
        <>
            <MyMenu />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;