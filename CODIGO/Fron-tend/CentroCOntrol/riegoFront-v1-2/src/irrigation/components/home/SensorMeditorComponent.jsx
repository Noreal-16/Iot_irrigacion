import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import ReactSpeedometer from "react-d3-speedometer";
import Typography from "@mui/material/Typography";
import Config_mqtt from "../../../API/config_mqtt";
import mqtt from "mqtt";
import { ConnectSuscribeMqtt } from "../../../utils/ConnectSuscribeMqtt";
import API from "../../../API/API_REST";
import axios from "axios";

/**
 * Conexion MQTT
 */
const client = mqtt.connect(Config_mqtt.url, {
        username: Config_mqtt.username,
        password: Config_mqtt.password
    });
    client.on('connect', () => {
        const topic = ['estadoRiego']
        client.subscribe(topic, (err) => {
            if (err) console.log("Error de conexion " + err);
        })
    });

export const SensorMeter = ({data}) => {

    const {state} = ConnectSuscribeMqtt(data);
    const [estadoRiego, setEstadoRiego] = useState(0);

    useEffect(() => {
        client.on('message', (topic, payload) => {
            console.log(topic, payload.toString())
            setEstadoRiego(payload.toString());
        })

    }, [estadoRiego])

    const verificador=async(estadoR, valorSensor)=>{
        
        console.log("Ingreso")
        if (estadoR === "0" && valorSensor <= 40){
            await axios.post(`${API}/riego`, { message:1 });
        }
        if (estadoR==="1" && valorSensor > 40){
            await axios.post(`${API}/riego`, { message:0 });
        }
    }

    useEffect(() => {
        verificador(estadoRiego, state);
    }, [state])
    

    return (
        <Card sx={{ maxWidth: 345}} >
            <CardContent>
            <div className="container-sensor"  >
            <ReactSpeedometer
                maxValue={100}
                minValue={0}
                height={190}
                width={290}
                value={state.length < 1 ? 50 : state}
                needleTransition="easeQuadIn"
                needleTransitionDuration={1000}
                needleColor="red"
                startColor="red"
                segments={10}
                endColor="green"
            />
            <Typography variant="body2" color="text.secondary" align="center">
                Data {data} en (%)
            </Typography>
        </div>
            </CardContent>
        </Card>
    )
}