import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import {LoginPage} from "../pages/LoginPage";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />

            <Route path="/*" element={<Navigate to='/auth/login'/>} />
        </Routes>
    )
}