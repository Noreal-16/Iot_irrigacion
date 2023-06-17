import 'package:flutter/foundation.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

class MqttHandler with ChangeNotifier {
  final ValueNotifier<String> data = ValueNotifier<String>("");
  MqttServerClient? client;
  bool _statusButtonEncender=false;
  bool _statusButtonCancel=false;


  bool get statusButtonEncender => _statusButtonEncender;

  set statusButtonEncender(bool value) {
    _statusButtonEncender = value;
    notifyListeners();
  }
  bool get statusButtonCancel => _statusButtonCancel;

  set statusButtonCancel(bool value) {
    _statusButtonCancel = value;
    notifyListeners();
  }

  Future<Object> connect() async {
    client = MqttServerClient.withPort(
        '165.22.6.109', 'lens_ALGxRhLLfeAVFZU2iMgNfBTyNUS232332323', 1883);
    client!.logging(on: true);
    client!.onConnected = onConnected;
    client!.onDisconnected = onDisconnected;
    client!.onUnsubscribed = onUnsubscribed;
    client!.onSubscribed = onSubscribed;
    client!.onSubscribeFail = onSubscribeFail;
    client!.pongCallback = pong;
    client!.keepAlivePeriod = 60;
    client!.logging(on: true);

    /// Set the correct MQTT protocol for mosquito
    client!.setProtocolV311();


    final connMessage = MqttConnectMessage()
        .withWillTopic('willtopic')
        .withWillMessage('Will message')
        .startClean()
        .withWillQos(MqttQos.atLeastOnce);

    print('MQTT_LOGS::Mosquitto client connecting....');
    // Configurar credenciales de usuario y contraseña
    connMessage.authenticateAs('riego', '3435');
    client!.connectionMessage = connMessage;
    try {
      await client!.connect();
    } catch (e) {
      print('Exception: $e');
      client!.disconnect();
    }

    if (client!.connectionStatus!.state == MqttConnectionState.connected) {
      print('MQTT_LOGS::Mosquitto client connected');
    } else {
      print(
          'MQTT_LOGS::ERROR Mosquitto client connection failed - disconnecting, status is ${client!.connectionStatus}');
      client!.disconnect();
      return -1;
    }

    print('MQTT_LOGS::Subscribing to the test/lol topic');
    const topic = 'estadoRiego';
    client!.subscribe(topic, MqttQos.atMostOnce);

    client!.updates!.listen((List<MqttReceivedMessage<MqttMessage?>>? c) {
      final recMess = c![0].payload as MqttPublishMessage;
      final pt =
      MqttPublishPayload.bytesToStringAsString(recMess.payload.message);

      data.value = pt;
      notifyListeners();
      print('MQTT_LOGS:: New data arrived: topic is <${c[0].topic}>, payload is $pt');
      print('');
      if(pt==1){
        statusButtonEncender=false;
        statusButtonCancel=true;
      }else{
        statusButtonEncender=true;
        statusButtonCancel=false;
      }
      notifyListeners();
    });

    return client!;
  }

  void onConnected() {
    print('MQTT_LOGS:: Connected');
  }

  void onDisconnected() {
    print('MQTT_LOGS:: Disconnected');
  }

  void onSubscribed(String topic) {
    print('MQTT_LOGS:: Subscribed topic: $topic');
  }

  void onSubscribeFail(String topic) {
    print('MQTT_LOGS:: Failed to subscribe $topic');
  }

  void onUnsubscribed(String? topic) {
    print('MQTT_LOGS:: Unsubscribed topic: $topic');
  }

  void pong() {
    print('MQTT_LOGS:: Ping response client callback invoked');
  }

  void publishMessage(String message) {
    const pubTopic = 'controlRiego';
    final builder = MqttClientPayloadBuilder();
    builder.addString(message.toString());
    if (client!.connectionStatus?.state == MqttConnectionState.connected) {
      client!.publishMessage(pubTopic, MqttQos.atMostOnce, builder.payload!);
    }
  }

  Future initMqtt(String mensaje)async{
    await connect();
    publishMessage(mensaje);
  }
}