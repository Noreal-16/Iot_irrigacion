import React from "react";
import {DashBoardLayout} from "../layout/DashBoardLayout";
import {FormProfileComponent} from "../components/users/FormProfileComponent";

export const ProfilePage = () => {
    return (
        <DashBoardLayout title="Perfil de Usuario">
            <FormProfileComponent/>
        </DashBoardLayout>
    )
}