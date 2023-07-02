import {DashBoardLayout} from "../layout/DashBoardLayout";
import {TableUserComponent} from "../components/users/TableUserComponent";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
export const UsersPage = () => {
return (
        <DashBoardLayout title={"Administración de Usuarios"}>
            <TableContainer component='div'
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 2, mt: 3
                            }}>
                <TableUserComponent/>
            </TableContainer>
        </DashBoardLayout>
    )
}