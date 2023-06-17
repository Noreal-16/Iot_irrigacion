/**
   Declaración de Librerias
*/
#include <Arduino.h>
#include "PubSubClient.h" // Conectar y publicar con el broker 
#include "WiFi.h" // Enables the ESP32 to connect to the local network (via WiFi)
#define TIME_DELAY 2000 // Cada cuánto leer del sensor
#define SENSOR  27 //sensor de caudal GPIO 27
/**
 * Variables sensores
 */
const int outPin = 23; //Pin GPIO-23 Para control de Relay
String outState = "Apagado";
String dataSensor;
String dataSensor1;
String dataSensor2;
/*
   Valores de calibracion de sensor de caudal
*/
long currentMillis = 0;
long previousMillis = 0;
int interval = 1000;
boolean ledState = LOW;
float calibrationFactor = 4.5;
volatile byte pulseCount;
byte pulse1Sec = 0;
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
/**
   Variables para configuracion de wifi y broker
*/
// WiFi
char* ssid = "Nettplus Electro";        // Nombre de la red del sembrio
const char* wifi_password = "1105639015Kevin";  // COntraseña de la red

// MQTT configuracion con el servidor Raspberry Pi
const char* mqtt_server = "192.168.0.108";  // Direccion Ip del Broker o Raspberry Pi
//const char* temperature_topic = "home/sembrio1/temperature";
const char* caudalAgua_topic = "caudal";
const char* relayController = "controlRiego";
const char* mqtt_username = "riego"; // Nombre del Usuario del MQTT configurado en el broker
const char* mqtt_password = "3435"; // Nombre del Contraseña del MQTT configurado en el broker
const char* clientID = "riego";
const int mqtt_port = 1883;

/**

*/
WiFiClient wifiClient;
PubSubClient client(wifiClient);
// El mensaje que se envía al servidor. Debe ser lo suficientemente
// grande
char mensaje[500] = "";
int env_msg_delay = millis(); // Para enviar cada X segundos pero sin usar delay

/*
   Contador para Sensor de caudal
*/
void IRAM_ATTR pulseCounter()
{
  pulseCount++;
}
/**
   Metodo de encendido y Apagado de Relay
*/
void apagarLed()
{
  digitalWrite(outPin, LOW);
}

void encenderLed()
{
  digitalWrite(outPin, HIGH);
}

/**
   Función Callback para recibir un mensaje desde el broker
*/
void callback(char *topic, byte *payload, unsigned int length) {
  if (length <= 0)
    return;
  char primerCaracter = (char)payload[0];
  if (primerCaracter == '0')
    apagarLed();
  else if (primerCaracter == '1')
    encenderLed();

  delay(1000);
}

/**
   Setup se ejecuta al darle voltaje al esp32
*/
void setup() {
  Serial.begin(115200);
  pinMode(outPin, OUTPUT);
  digitalWrite(outPin, LOW);
  apagarLed();

  // Conexión WiFi
  WiFi.begin(ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println('....');
    delay(500);
  }

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  while (!client.connected())
  {
    if (!client.connect("ClienteESP321", mqtt_username, mqtt_password))
    {
      Serial.print("Conectado ");
      Serial.println(mqtt_username);
      delay(2000);
    }
  }
  client.subscribe(relayController); //mensaje recibido por mqtt
  /*
     Sensor Caudal
  */
  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;

  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);
}
/*
   Sensor de Cudal
*/
void SesnsorCaudalAgua() {

}

/**
   Loop se ejecuta en un ciclo
*/
void loop() {
  client.loop();
  if (millis() - env_msg_delay > TIME_DELAY) {
    currentMillis = millis();
  if (currentMillis - previousMillis > interval) {

    pulse1Sec = pulseCount;
    pulseCount = 0;
    flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor;
    previousMillis = millis();

    flowMilliLitres = (flowRate / 60) * 1000;
    totalMilliLitres += flowMilliLitres;
 // En ocasiones puede devolver datos erróneos; por eso lo comprobamos
    if (isnan(flowRate) || isnan(totalMilliLitres))
    {
      env_msg_delay = millis();
      return;
    }
    // Print the flow rate for this second in litres / minute
    Serial.print("Flow rate: ");
    Serial.print(int(flowRate));  // Print the integer part of the variable
    Serial.print("L/min");
    Serial.print("\t");       // Print tab space

    // Print the cumulative total of litres flowed since starting
    Serial.print("Output Liquid Quantity: ");
    Serial.print(totalMilliLitres);
    Serial.print("mL / ");
    Serial.print(totalMilliLitres / 1000);
    Serial.println("L");
  }
  // MQTT can only transmit strings
  String caudalAgua = String((int)totalMilliLitres);
  //  = "{\"L/min\":\""+String((int)flowRate)+ "\"","mL\":\""+String((int)totalMilliLitres)+"\"","L\":\""+String((long)totalMilliLitres / 1000)+"\""+"}";
  dataSensor = "{ \"L/min\": \"" + String((int)flowRate) + "\"" + "," + "\"mL\": \"" + String((int)totalMilliLitres) + "\"" + "," +  "\"L\": \"" + String((long)totalMilliLitres / 1000) + "\"" + "}";
  // PUBLISH to the MQTT Broker (topic = HumiditySolid, defined at the beginning)
  if (client.publish(caudalAgua_topic, String(caudalAgua).c_str())) {
    Serial.println("Humidity solid sent!");
  } else {
    client.connect(clientID, mqtt_username, mqtt_password);
    delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
    client.publish(caudalAgua_topic, String(caudalAgua).c_str());
  }
   
   
    env_msg_delay = millis();

  }
  delay(1000);
}
