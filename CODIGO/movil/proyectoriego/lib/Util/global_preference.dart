import 'dart:convert';

import 'package:proyectoriego/Models/response_login.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GlobalPreference {
  static const stateLogin = 'stateLogin';
  static const modelUser = 'modelUser';

  Future setStateLogin(bool value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setBool(stateLogin, value);
  }

  static Future getStateLogin() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool(stateLogin) ?? false;
  }

  static deleteStateLogin() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove(stateLogin);
  }

  Future saveUser(ResponseLogin user) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    JsonEncoder encoder = const JsonEncoder();
    prefs.setString(modelUser, encoder.convert(user.toMap()));
  }

  @override
  Future<ResponseLogin?> getUser() async {
    JsonDecoder decoder = const JsonDecoder();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    String? user = prefs.getString(modelUser) ?? "";
    if (user.isEmpty) {
      return null;
    }
    var decoded = decoder.convert(user);
    //return modelUser.map(decoder.convert(user));
  }

  @override
  Future deleteUser() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove(modelUser);
  }

}
enum SupportState {
  unknown,
  supported,
  unsupported,
}