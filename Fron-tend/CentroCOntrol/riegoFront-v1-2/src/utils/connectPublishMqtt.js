import mqtt from 'mqtt';
import swal from "sweetalert2";
import config_mqtt from "../API/config_mqtt";

export const ConnectPublisherMqtt = (topic, message) => {
    const client = mqtt.connect(config_mqtt.url, {
        username: config_mqtt.username,
        password: config_mqtt.password
    });
    client.on('connect', () => {
        client.publish(topic, message.toString());
        if (message.toString() === '1'){
            swal.fire({
                title: 'Success Control Riego',
                text: "Riego Encendido",
                icon: "success",
                timer: 2000
            })
        }else{
            swal.fire({
                title: 'Success Control Riego',
                text: "Riego Apagado",
                icon: "success",
                timer: 2000
            })
        }
    });
}