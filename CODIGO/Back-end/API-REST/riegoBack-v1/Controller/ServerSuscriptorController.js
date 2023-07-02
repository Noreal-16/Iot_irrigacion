const mqtt = require('mqtt');
const Sensor = require('../Models/Sensor');
const Topic = require('../Models/TopicSensor');
const SensorCaudal = require('../Models/SensorCaudal');
//159.223.125.186//192.168.0.108
class ServerSuscriptorController {
    constructor() {
        this.mqttClient = null;
        this.host = '165.22.6.109';
        this.port = '9001';
        this.username = 'riego';
        this.password = '3435';
    }

    connect() {
        this.mqttClient = mqtt.connect(`ws://${this.host}:${this.port}`, {
        //this.mqttClient = mqtt.connect(`mqtt://159.223.182.77:1883`, {
            username: this.username,
            password: this.password
        });
        this.mqttClient.on('error', (error) => {
            console.log('Ocurrio un error al conectarse ', error)
            this.mqttClient.end();
        })
        this.mqttClient.on('connect', async () => {
            console.log('Conectado a MQTT Broker');
            let topic = [];
            await Topic.find({}).then((result) => {
                if (result) {
                    console.log(this.dataTopic);
                    result.forEach((data) => {
                        const dataTopic = data.nameTopic;
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
            this.mqttClient.subscribe(topic, () => {
                console.log('Conectado al topic ' + topic);
            });
        });
        this.mqttClient.on('message', (topic, payload) => {
            console.log("El topic ", topic, " y el mensaje ", payload.toString());
            Topic.find({}).then((result)=>{
                result.forEach((data)=>{
                    if (topic === 'caudal' && data.nameTopic === 'caudal'){
                        const lecturaSensorCaudal = SensorCaudal({
                            topic: data._id,
                            message: payload.toString(),
                            Date: new Date()
                        });
                        lecturaSensorCaudal.save().then((result) => {
                            console.log('Lectura de sensores guardada correctamente');
                        }).catch((error) => {
                            console.log('Error al guardar Lectura de sensor');
                        })
                    }else if(data.nameTopic === topic){
                        const lecturaSensor = Sensor({
                            topic: data._id,
                            message: payload.toString(),
                            Date: new Date()
                        });
                        lecturaSensor.save().then((result) => {
                            console.log('Lectura de sensores guardada correctamente');
                        }).catch((error) => {
                            console.log('Error al guardar Lectura de sensor');
                        })
                    }
                })

            }).catch((error)=>{
                console.log(error);
            })
        })

        this.mqttClient.on('close', () => {
            console.log('Cliente desconectado');
        });
    }
}

module.exports = ServerSuscriptorController;