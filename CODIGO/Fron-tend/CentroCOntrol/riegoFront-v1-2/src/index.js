import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {IrrigationApp} from "./IrrigationApp";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <IrrigationApp/>
            </DevSupport>
        </BrowserRouter>
    </React.StrictMode>
);

