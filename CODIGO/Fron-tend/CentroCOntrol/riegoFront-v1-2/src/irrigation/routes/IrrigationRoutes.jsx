import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {SoilPage} from "../pages/SoilPage";
import {IrrigationPage} from "../pages/IrrigationPage";
import {ProfilePage} from "../pages/ProfilePage";
import {UsersPage} from "../pages/UsersPage";
import {TopicSensorsPage} from "../pages/TopicSensorsPage";
import {TopicsActuatorsPage} from "../pages/TopicsActuatorsPage";
import {HistoricsPage} from "../pages/HistoricsPage";

export const IrrigationRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<IrrigationPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/users' element={<UsersPage/>}/>
            <Route path='/historics' element={<HistoricsPage/>}/>
            <Route path='/soil' element={<SoilPage/>}/>
            <Route path='/sensors' element={<TopicSensorsPage/>}/>
            <Route path='/actuators' element={<TopicsActuatorsPage/>}/>
            <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
    )
}