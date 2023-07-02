'use strict';
const mqtt = require('mqtt');
const TopicActuador = require('../Models/TopicActuator');
/**
 * Metodo para control de Riego
 * @param req Credenciales MQTT
 * @param res Control de relay
 * @constructor
 */
exports.MqttControlRiego = (req, res) => {
    const URI = 'mqtt://165.22.6.109:1883';
    //const URI = 'mqtt://localhost:9000';
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const client = mqtt.connect(URI, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: 'riego',
        password: '3435',
        reconnectPeriod: 1000,
    });
    client.on('connect', async () => {
        console.log("Publicador conectado");
        const topic = [];
        await TopicActuador.find({}).then((result) => {
            if (result) {
                result.forEach((data) => {
                    const dataTopic = data.nameTopicActuator;
                    topic.push(dataTopic)
                });
            } else {
                res.send({
                    message: 'No existen Topics Registrados',
                    data: topic
                });
            }
        }).catch((error) => {
            res.send({
                message: 'Error en la consulta Topic',
                error: error
            })
        });
        const mensaje = req.body.message;
        const [dato] = topic;
        console.log(mensaje);
        client.publish(dato, mensaje.toString());
        let response;
        if (mensaje == 1) {
            response = {
                message: 'Riego Encendido',
                status: true
            }
        } else {
            response = {
                message: 'Riego Apagado',
                status: true
            }
        }
        res.send(response);
        console.log("Mensaje enviado");
    })
}