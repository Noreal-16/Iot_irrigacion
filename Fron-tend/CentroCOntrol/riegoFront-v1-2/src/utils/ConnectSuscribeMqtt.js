import  {useEffect, useState} from "react";
import mqtt from "mqtt";
import Config_mqtt from "../API/config_mqtt";


export const ConnectSuscribeMqtt=(topic)=>{
    const [state, setState] = useState(0);
    const client = mqtt.connect(Config_mqtt.url, {
        username: Config_mqtt.username,
        password: Config_mqtt.password
    });
    client.on('connect', () => {
        console.log("conectado");
        client.subscribe(topic, (err) => {
            if (err) console.log("Error de conexion " + err);
        })
    });
    useEffect(() => {
        client.on('message', (topic, payload) => {
                setState(parseInt(payload.toString(), 10))
        })
    }, [])
    return {...state, state}
}