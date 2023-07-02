import {DashBoardLayout} from "../layout/DashBoardLayout";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {TableTopicComponent} from "../components/topics/TableTopicComponent";

export const TopicsActuatorsPage = () => {
    return (
        <DashBoardLayout title="Topics Actuadores">
            <TableContainer component='div'
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 2, mt: 3
                            }}>
                <TableTopicComponent/>
            </TableContainer>
        </DashBoardLayout>
    )
}