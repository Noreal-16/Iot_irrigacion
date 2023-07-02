import React from "react";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import ReactSpeedometer from "react-d3-speedometer";
import Typography from "@mui/material/Typography";
import { ConnectSuscribeMqtt } from "../../../utils/ConnectSuscribeMqtt";

export const SensorMeterCaudal = ({topic}) => {
    const {state} = ConnectSuscribeMqtt(topic) ;
    return (
        <Card sx={{ maxWidth: 345}} >
            <CardContent  >
            <div className="container-sensor"  >
            <ReactSpeedometer
                maxValue={1000}
                minValue={0}
                height={190}
                width={290}
                value={state}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
            />
            <Typography variant="body2" color="text.secondary" align="center">
                Data {state} en (L)
            </Typography>
        </div>
            </CardContent>
        </Card>
    )
}