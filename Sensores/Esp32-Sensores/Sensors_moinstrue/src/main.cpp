#include <Arduino.h>
#include "PubSubClient.h"
#include "WiFi.h"
#define TIME_DELAY 2000
/**
 * Inicializer ports
 */
const int sensorPing = 36;
const int sensorPing1 = 34;
const int sensorPing2 = 35;

String dataSensor, dataSensor1, dataSensor2;
/**
 * Deep Sleep
 */
uint64_t uS_TO_S_FACTOR = 1000000; // conversion factor for microseconds to seconds
// Sleep for 30 minutes = 0.5 hous = 1800 seconds
uint64_t TIME_TO_SLEEP = 20;
/**
 * Wifi configuration
 */
const char *ssid = "Nettplus Electro";        // Nombre de la red del sembrio
const char *wifi_password = "yane1105639130"; // Contraseña de la red

const char *mqtt_server = "159.223.125.186"; // Direccion Ip del Broker o Raspberry Pi
const char *humedytySolid_topic = "suelo1";
const char *humedytySolid_topic1 = "suelo2";
const char *humedytySolid_topic2 = "suelo3";
const char *mqtt_username = "riego"; // Nombre del Usuario del MQTT configurado en el broker
const char *mqtt_password = "3435";  // Nombre del Contraseña del MQTT configurado en el broker
const char *clientID = "riegoSensor";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient client(wifiClient);
char mensaje[500] = "";
int env_msg_delay = millis(); // Para enviar cada X segundos pero sin usar delay

void connectionWifiAndMqtt()
{
  WiFi.begin(ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Connecting...");
    delay(500);
  }
  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected())
  {
    if (!client.connect("ClienteEsp32", mqtt_username, mqtt_password))
    {
      Serial.print("Conectiong to Mqtt...");
      Serial.print(mqtt_username);
      delay(2000);
    }
  }
}

int getDataSensors(int sensorGpio)
{
  int moinsturePercentage;
  if (millis() - env_msg_delay > TIME_DELAY)
  {
    moinsturePercentage = analogRead(sensorGpio);
    moinsturePercentage = map(moinsturePercentage, 0, 4095, 100, 0);
    Serial.print("  Moisture soil");
    Serial.print(moinsturePercentage);
    Serial.println("%");
  }
  return moinsturePercentage;
}


void sendDataMoinsture(int dataSensorsReturned, String dataSensors, const char *topicSensor)
{
  client.loop();
  if (millis() - env_msg_delay > TIME_DELAY)
  {
    if (isnan(dataSensorsReturned))
    {
      env_msg_delay = millis();
      return;
    }
    Serial.print("Topic ");
    Serial.println(topicSensor);
    String dataMoinstureSoil = String((float)dataSensorsReturned);
    dataSensors = "{ \"Hum_soil\": \"" + String((float)dataSensorsReturned) + "\"" + "}";
    if (client.publish(topicSensor, String(dataMoinstureSoil).c_str()))
    {
      Serial.println("Humedity soil sent!");
    }
    else
    {
      client.connect(clientID, mqtt_username, mqtt_password);
      delay(10);
      client.publish(topicSensor, String(dataMoinstureSoil).c_str());
    }
    env_msg_delay = millis();
  }
  delay(1000);
}

void setup()
{
  Serial.begin(9600);

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);

  connectionWifiAndMqtt();
  sendDataMoinsture(getDataSensors(sensorPing), dataSensor, humedytySolid_topic);
  delay(2000);
  sendDataMoinsture(getDataSensors(sensorPing1), dataSensor1, humedytySolid_topic1);
  delay(2000);
  sendDataMoinsture(getDataSensors(sensorPing2), dataSensor2, humedytySolid_topic2);
  //delay(3000);
  Serial.println("Adios..!");
  esp_deep_sleep_start();
}

void loop()
{
  // put your main code here, to run repeatedly:
}
