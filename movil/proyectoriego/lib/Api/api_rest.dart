import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:proyectoriego/Api/base_api.dart';
import 'package:proyectoriego/Models/response_login.dart';
import 'package:proyectoriego/Util/global_text.dart';
import 'package:proyectoriego/Util/global_widget.dart';

class ApiRest {
  Dio dio = Dio();
  BaseApi baseApi = BaseApi();

  Future encenderRele(BuildContext? context, VoidCallback? Function(int? t, dynamic data) callback) async {
    const url = '${GlobalText.urlConnection}${GlobalText.urlRiego}';
    var data={
      'message':1
    };
    try {
      final response = await dio.post(url,data: data);
      print('respuesta registro >>>> $response');
      if (response.data != null) {
        GlobalWidget().messageAlert(context!,"Encendido");
      }
    } catch (e) {
      print('ERROR REGISTRO $e');
    }
  }
  Future apagarRele(BuildContext? context, VoidCallback? Function(int? t, dynamic data) callback) async {
    const url = '${GlobalText.urlConnection}${GlobalText.urlRiego}';
    var data={
      'message':0
    };
    try {
      final response = await dio.post(url,data: data);
      print('respuesta registro >>>> $response');
      if (response.data != null) {
        GlobalWidget().messageAlert(context!,"Apagado");
      }
    } catch (e) {
      print('ERROR REGISTRO  $e');
    }
  }

  Future login(BuildContext? context, String email, String password, VoidCallback? Function(int? t, dynamic data) callback) async {
    const url = '${GlobalText.urlConnection}${GlobalText.urlLogin}';

    Map<String, String> parameters = {
      "email": email,
      "password": password,
    };

    if(email!='admin@prueba.com'){
      GlobalWidget().messageAlert(context!,"Usuario no registrado");
      return;
    }
    if(password!='admin'){
      GlobalWidget().messageAlert(context!,"Usuario/contraseña incorrecto");
      return;
    }
    callback(1,'Success');
    /*try {
      var res = await baseApi.baseApiAntigua(url, body: parameters).timeout(Duration(seconds: 30), onTimeout: () {
        return {"en": -1, "m": "Ocurrió un problema, intente nuevamente más tarde."};
      });
      print('>>>>>>>> Res $res');
      final response = await dio.post(url,data: parameters);
      print('respuesta login >>>> $response');
      if (response.data == null) return callback(-1, 'Ocurrió un problema, intente nuevamente más tarde.');
      callback(1, ResponseLogin.fromMap(response.data));
    } catch (e) {
      print('ERROR LOGIN $e' );
      callback(-1, 'Ocurrió un problema, intente nuevamente más tarde.');
    }*/
  }

  Future getUser(BuildContext? context, VoidCallback? Function(int? t, dynamic data) callback) async {
    const url = '${GlobalText.urlConnection}${GlobalText.urlUser}';
    print("User >>>>>1 " + url);
    var res = await baseApi.get(url).timeout(Duration(seconds: 30), onTimeout: () {
      return {"en": -1, "m": "Ocurrió un problema, intente nuevamente más tarde."};
    });
    print("User >>>>>2 " + res.toString());
   // LugaresCercanosResponse response = LugaresCercanosResponse.fromJson(res);
    //return response ;
  }

  Future register(BuildContext? context,String name, String lastName, String telefono,String direcction, String email, String password, VoidCallback? Function(int? t, dynamic data) callback) async {
    const url = '${GlobalText.urlConnection}${GlobalText.urlRegister}';

    Map<String, String> parameters = {
      "nameU": name,
      "lastName": lastName,
      "telephone": telefono,
      "direction": direcction,
      "email": email,
      "password": password,
    };
    print("register >>>>>1 " + url);
    // Map<String, String> headers = {'version': ''};
    var res = await baseApi.baseApiAntigua(url, body: parameters).timeout(Duration(seconds: 30), onTimeout: () {
      return {"en": -1, "m": "Ocurrió un problema, intente nuevamente más tarde."};
    });
    print("register >>>>>2 " + res.toString());
    // LugaresCercanosResponse response = LugaresCercanosResponse.fromJson(res);
    //return response ;
  }

}
