/**
   Declaración de Librerias
*/
#include <Arduino.h>
#include "PubSubClient.h" // Conectar y publicar con el broker 
#include "WiFi.h" // Enables the ESP32 to connect to the local network (via WiFi)
#define TIME_DELAY 2000 // Cada cuánto leer del sensor

/**
   Variables Globales suelo
*/
const int SensorPin = 36; //Pin GPIO-36 es pin Analogico de 0-3.3V o 5V -> 0 - 4095 SP
const int SensorPin1 = 34; //Pin GPIO-36 es pin Analogico de 0-3.3V o 5V -> 0 - 4095 SP
const int SensorPin2 = 35; //Pin GPIO-36 es pin Analogico de 0-3.3V o 5V -> 0 - 4095 SP
/**
 * Variables sensores
 */
String dataSensor;
String dataSensor1;
String dataSensor2;

/**
   Variables para configuracion de wifi y broker
*/
// WiFi
char* ssid = "Nettplus Electro";        // Nombre de la red del sembrio
const char* wifi_password = "yane1105639130";  // COntraseña de la red

// MQTT configuracion con el servidor Raspberry Pi
//const char* mqtt_server = "192.168.0.108";  // Direccion Ip del Broker o Raspberry Pi
const char* mqtt_server = "159.223.125.186";  // Direccion Ip del Broker o Raspberry Pi
//const char* temperature_topic = "home/sembrio1/temperature";
const char* humedytySolid_topic = "suelo1";
const char* humedytySolid_topic1 = "suelo2";
const char* humedytySolid_topic2 = "suelo3";
const char* mqtt_username = "riego"; // Nombre del Usuario del MQTT configurado en el broker
const char* mqtt_password = "3435"; // Nombre del Contraseña del MQTT configurado en el broker
const char* clientID = "riegoSensor";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient client(wifiClient);
char mensaje[500] = "";
int env_msg_delay = millis(); // Para enviar cada X segundos pero sin usar delay

/**
   Setup se ejecuta al darle voltaje al esp32
*/
void setup() {
  Serial.begin(115200);

  // Conexión WiFi
  WiFi.begin(ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println('....');
    delay(500);
  }

  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected())
  {
    if (!client.connect("ClienteESP32", mqtt_username, mqtt_password))
    {
      Serial.print("Conectando... ");
      Serial.println(mqtt_username);
      delay(2000);
    }
  }
}

/**
   Loop se ejecuta en un ciclo
*/
void loop() {
  client.loop();

  if (millis() - env_msg_delay > TIME_DELAY) {
    /**
       Sensores de suelo
    */
    //SENSOR 1
    int moisturePercentage = analogRead(SensorPin) ;
    moisturePercentage = map(moisturePercentage, 0, 4095, 100, 0);
    //SENSOR 2
    int moisturePercentage1 = analogRead(SensorPin1) ;
    moisturePercentage1 = map(moisturePercentage1, 0, 4095, 100, 0);
    //SENSOR 3
    int moisturePercentage2 = analogRead(SensorPin2) ;
    moisturePercentage2 = map(moisturePercentage2, 0, 4095, 100, 0);

    // En ocasiones puede devolver datos erróneos; por eso lo comprobamos
    if (isnan(moisturePercentage) || isnan(moisturePercentage1) || isnan(moisturePercentage2) )
    {
      env_msg_delay = millis();
      return;
    }
    Serial.print("Humedad del suelo-> 0 ");
    Serial.print(moisturePercentage);
    Serial.println("%");

    Serial.print("Humedad del suelo -> 1 ");
    Serial.print(moisturePercentage1);
    Serial.println("%");

    Serial.print("Humedad del suelo -> 2");
    Serial.print(moisturePercentage2);
    Serial.println("%");

    // MQTT can only transmit strings
    String shs = String((float)moisturePercentage);
    dataSensor1 = "{ \"Hum_soil\": \"" + String((float)moisturePercentage) + "\"" + "}";
    // PUBLISH to the MQTT Broker (topic = HumiditySolid, defined at the beginning)
    if (client.publish(humedytySolid_topic, String(shs).c_str())) {
      Serial.println("Humidity solid sent!");
    } else {
      client.connect(clientID, mqtt_username, mqtt_password);
      delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
      client.publish(humedytySolid_topic, String(shs).c_str());
    }
    /**
       Sensor 2
    */
    // MQTT can only transmit strings
    String shs1 = String((float)moisturePercentage1);
    if (client.publish(humedytySolid_topic1, String(shs1).c_str())) {
      Serial.println("Humidity solid sent -> 1!");
    } else {
      client.connect(clientID, mqtt_username, mqtt_password);
      delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
      client.publish(humedytySolid_topic1, String(shs1).c_str());
    }
    /**
       Sensor 3
    */
    String shs2 = String((float)moisturePercentage2);
    if (client.publish(humedytySolid_topic2, String(shs2).c_str())) {
      Serial.println("Humidity solid sent -> 2!");
    } else {
      client.connect(clientID, mqtt_username, mqtt_password);
      delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
      client.publish(humedytySolid_topic2, String(shs2).c_str());
    }
    env_msg_delay = millis();

  }
  delay(1000);
}
