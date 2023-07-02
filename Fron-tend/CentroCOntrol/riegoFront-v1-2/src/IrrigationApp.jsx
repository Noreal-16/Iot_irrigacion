import React from "react";
import {AppTheme} from "./theme";
import {AppRouter} from "./router/AppRouter";
import {AuthProvider} from "./auth/context/AuthProvider";

export const IrrigationApp = () => {
    return (
        <AppTheme>
            <AuthProvider>
                <AppRouter/>
                
            </AuthProvider>
        </AppTheme>
    )
}