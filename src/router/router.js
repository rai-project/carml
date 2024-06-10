import React from "react";
import routes from "./config";
import {Route, Routes} from "react-router-dom";

export default function Router() {
    return (
        <Routes>
            {
                routes.map((route, i) =>
                    <Route exact={route.exact !== false} key={i} path={route.path} element={route.component}/>)
            }
        </Routes>
    );
}
