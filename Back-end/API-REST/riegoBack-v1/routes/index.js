const express = require('express');
const router = express.Router();
/**
 * 
 * Actuador Para MQTT
 */
const publishMqtt = require('../Controller/MqttIrrigationController')

/**
 * @swagger
 * /index:
 *   get:
 *     summary: Ejemplo de ruta
 *     description: Retorna Pagina principal express
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @swagger
 * /riego:
 *   post:
 *     summary: Control del riego
 *     description: Enciende o apga el riego
 *     parameters:
 *       - in: /riego
 *         name: message
 *         required: true
 *         description: mensaje de riego 
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/riego'
 *       404:
 *         description: Usuario no encontrado
 * */
router.post('/riego', publishMqtt.MqttControlRiego);

module.exports = router;
