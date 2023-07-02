import React from "react";
import {DashBoardLayout} from "../layout/DashBoardLayout";
import {SensorHome} from "../views/SensorHome";

export const IrrigationPage = () => {
    return (
        <DashBoardLayout title="Centro de Control">
            <SensorHome/>
        </DashBoardLayout>
    )
}