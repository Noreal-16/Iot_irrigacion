import mqtt from 'mqtt';
import Config_mqtt from '../API/config_mqtt';

export const ConnectAutomatlyIrrigation = (topic, message) => {
    const client = mqtt.connect(Config_mqtt.url, {
        username: Config_mqtt.username,
        password: Config_mqtt.password
    });
    client.on('connect', () => {
            client.publish(topic, message.toString());
    });
}