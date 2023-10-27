import {
    createBrowserRouter, RouteObject,
} from "react-router-dom";
import {Home} from "../pages/Home";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
        errorElement: <p>404 index</p>,
    },
    {
        path: "/about",
        element: <p>About</p>,
        errorElement: <p>404 about</p>,
    }
];


export const Router = createBrowserRouter(routes, {
    basename: "/benaja-bendo/",
});