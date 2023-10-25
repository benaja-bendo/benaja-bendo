import {
    createBrowserRouter, RouteObject,
} from "react-router-dom";
import {Home} from "../pages/Home";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
        errorElement: <p>404</p>,
    },
];


export const Router = createBrowserRouter(routes);