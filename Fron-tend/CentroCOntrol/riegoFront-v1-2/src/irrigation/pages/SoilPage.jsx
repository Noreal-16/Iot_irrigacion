import {TableSoilComponent} from "../components/soil/TableSoilComponent";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {DashBoardLayout} from "../layout/DashBoardLayout";

export const SoilPage = () => {
    return (
        <DashBoardLayout title="Características de Suelo">
            <TableContainer component='div'
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 2, mt: 3
                            }}>
                <TableSoilComponent/>
            </TableContainer>
        </DashBoardLayout>
    )
}