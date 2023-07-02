import React from "react";
import {Route, Routes} from "react-router-dom";
import {IrrigationRoutes} from "../irrigation/routes/IrrigationRoutes";
import {AuthRouter} from "../auth/routes/AuthRouter";
import {PublicRouter} from "./PublicRouter";
import {PrivateRouter} from "./PrivateRouter";

export const AppRouter = () => {
    return (
        <Routes>
            {/*Login Register*/}
            <Route path="/auth/*" element={<PublicRouter><AuthRouter/></PublicRouter>}/>
            {/*Irrigation Page*/}
            <Route path="/*" element={<PrivateRouter><IrrigationRoutes/></PrivateRouter>}/>
        </Routes>
    )
}