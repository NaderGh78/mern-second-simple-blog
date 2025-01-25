import { createBrowserRouter, createHashRouter } from "react-router-dom";
import {
    Home,
    CreatePost,
    Layout,
    NotFound,
    Register,
    Login,
    Post,
    PostEdit
} from "../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/create",
                element: <CreatePost />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/post/:id",
                element: <Post />
            },
            {
                path: "/post-edit/:id",
                element: <PostEdit />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);