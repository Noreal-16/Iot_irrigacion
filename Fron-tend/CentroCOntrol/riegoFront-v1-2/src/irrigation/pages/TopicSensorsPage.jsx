import {DashBoardLayout} from "../layout/DashBoardLayout";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {TableTopicSensorComponent} from "../components/topics/TableTopicSensorsComponent";

export const TopicSensorsPage = () => {
    return (
        <DashBoardLayout title="Topics Sensores">
                    <TableContainer component='div'
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 2, mt: 3
                                    }}>
                        < TableTopicSensorComponent/>
                    </TableContainer>
        </DashBoardLayout>
    )
}