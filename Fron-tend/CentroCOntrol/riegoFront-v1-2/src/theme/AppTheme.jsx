import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import {unlTheme} from "./unlTheme";

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={unlTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
