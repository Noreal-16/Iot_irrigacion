import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

class BaseApi {
  static BaseApi _instance = new BaseApi.internal();

  BaseApi.internal();

  factory BaseApi() => _instance;


  Future<dynamic> baseApi(String url, {Map<String, String>? headers, body}) async {
    try {
      final resp = await http.post(Uri.parse(url), headers: headers, body: body).timeout(Duration(seconds: 30));
      print('Response >>>> ' + resp.body);
      final decodedData = json.decode(resp.body);
      return (decodedData);
    } on TimeoutException {
      print('Tiempo de espera agotado');
      return {"en": -1, "m": "Tiempo de espera agotado."};
    } on FormatException {
      print('Bad response');
      rethrow;
    } on HttpException {
      return {"en": -1, "m": "Sin conexión a Internet."};
    } on SocketException {
      return {"en": -1, "m": "Sin conexión a Internet."};
    } catch (e) {
      print(e.toString());
      return {"en": -1, "m": "Error de comunicación, vuelva a intentar."};
    }
  }

  Future<dynamic> baseApiAntigua(String url, {Map<String, String>? headers, body}) async {
    try {
      final resp = await http.post(Uri.parse(url), headers: headers, body: body).timeout(Duration(seconds: 30));

      print('Response >>>> ' + resp.body);
      final decodedData = json.decode(resp.body);
      return (decodedData);
    } on TimeoutException {
      print('Tiempo de espera agotado');
      return {"estado": -1, "mensaje": "Tiempo de espera agotado."};
    } on FormatException {
      print('Bad response');
      rethrow;
    } on HttpException {
      return {"estado": -1, "mensaje": "Sin conexión a Internet."};
    } on SocketException {
      return {"estado": -1, "mensaje": "Sin conexión a Internet."};
    } catch (e) {
      print(e.toString());
      return {"estado": -1, "mensaje": "Error de comunicación, vuelva a intentar."};
    }
  }

  Future<dynamic> get(String? url) async {
    try {
      final resp = await http.get(Uri.parse(url!)).timeout(Duration(seconds: 30));
      print('Response >>>> ' + resp.body);
      var decodedData;
      if (resp != null && resp.statusCode == 200) {
        decodedData = json.decode(resp.body);
      } else {
        return {"en": -1, "m": "Error de comunicación, vuelva a intentar."};
      }
      return (decodedData);
    } on TimeoutException {
      print('Tiempo de espera agotado');
      return {"en": -1, "m": "Tiempo de espera agotado."};
    } on FormatException {
      print('Bad response');
      rethrow;
    } on HttpException {
      return {"en": -1, "m": "Sin conexión a Internet."};
    } on SocketException {
      return {"en": -1, "m": "Sin conexión a Internet."};
    } catch (e) {
      print(e.toString());
      return {"en": -1, "m": "Error de comunicación, vuelva a intentar."};
    }
  }
}
