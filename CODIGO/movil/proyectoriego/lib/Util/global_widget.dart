import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:proyectoriego/Util/global_color.dart';

import '../View/page_login.dart';
import 'global_preference.dart';

class GlobalWidget {
  Widget textTitle(String text) {
    return Text(
      text,
      style: const TextStyle(fontFamily: 'semibold', fontWeight: FontWeight.bold, fontSize: 28),
    );
  }

  messageAlert(BuildContext context, String message) {
    final snackBar = SnackBar(
      behavior: SnackBarBehavior.fixed,
      duration: const Duration(seconds: 3),
      content: Text(
        message,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.black,
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  Future<void> AlertSimpleMessage(BuildContext context, String title, String msj, VoidCallback callBack, {bool dismissible = false}) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(title),
          content: WillPopScope(
            onWillPop: () => Future.value(dismissible),
            child: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  Text(
                    msj,
                    style: NormalStyle(size: 18.0),
                  ),
                ],
              ),
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('ACEPTAR'),
              onPressed: () {
                Navigator.of(context).pop();
                callBack();
              },
            ),
          ],
        );
      },
    );
  }

  Widget drawerPrincipal(BuildContext context) {
    return Drawer(
      // Agrega un ListView al drawer. Esto asegura que el usuario pueda desplazarse
      // a través de las opciones en el Drawer si no hay suficiente espacio vertical
      // para adaptarse a todo.
      child: ListView(
        // Importante: elimine cualquier padding del ListView.
        padding: EdgeInsets.zero,
        children: <Widget>[
          const DrawerHeader(
            decoration: BoxDecoration(
              color: GlobalColor.colorPrincipal,
            ),
            child: Image(
              image: AssetImage('assets/image/riego1.png'),
              width: 150,
              /* errorBuilder: (context, _, __) async {
            return Image.asset('assets/image/logo.png')
          },*/
            ),
          ),
     /*     InkWell(
            splashColor: Colors.grey,
            onTap: () {},
            child: itemDrawer(texto: "Perfil", icon: Icons.person_outlined, sizetext: 13, sizeIcon: 25),
          ),*/
          InkWell(
            splashColor: Colors.grey,
            onTap: () {
              GlobalPreference.deleteStateLogin().then((value) {
               Navigator.of(context).pushNamedAndRemoveUntil(PageLogin.routePage, (Route<dynamic> route) => route.isFirst);
              });
            },
            child: itemDrawer(texto: "Cerrar sesiòn", icon: Icons.exit_to_app, sizetext: 13, sizeIcon: 25),
          ),InkWell(
            splashColor: Colors.grey,
            onTap: () {
              SystemChannels.platform.invokeMethod('SystemNavigator.pop');
            },
            child: itemDrawer(texto: "Salir", icon: Icons.cancel_outlined, sizetext: 13, sizeIcon: 25),
          ),
        ],
      ),
    );
  }
}

class NormalStyle extends TextStyle {
  final double size;
  final Color color;
  final bool bold;

  const NormalStyle({this.color = Colors.black, this.size = 16, this.bold = false})
      : super(
          color: color,
          fontSize: size,
          fontFamily: 'visby',
          fontWeight: bold ? FontWeight.bold : null,
        );
}

Widget itemDrawer({String? texto, IconData? icon, double? sizetext, double? sizeIcon}) {
  return Container(
    margin: EdgeInsets.only(left: 20, top: 10, bottom: 5),
    child: Row(
      children: [
        Icon(
          icon,
          size: sizeIcon,
          color: Colors.grey,
        ),
        const SizedBox(
          width: 30,
        ),
        Text(
          texto!,
          style: TextStyle(fontSize: sizetext),
        ),
      ],
    ),
  );
}
