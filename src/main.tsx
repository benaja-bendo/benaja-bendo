import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//     RouterProvider,
// } from "react-router-dom";
// import {Router} from "./routes";
import {Home} from "./pages/Home.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<RouterProvider router={Router}/>*/}
        <Home/>
    </React.StrictMode>,
)
