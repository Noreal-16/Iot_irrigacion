import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Api/api_rest.dart';
import 'package:proyectoriego/Controller/provider_login.dart';
import 'package:proyectoriego/Util/global_preference.dart';
import 'package:proyectoriego/View/page_navigation.dart';

import '../Util/global_color.dart';
import '../Util/global_widget.dart';


class PageLogin extends StatefulWidget {
  static String routePage = 'viewLogin';
  @override
  State<PageLogin> createState() => _PageLoginState();
}

class _PageLoginState extends State<PageLogin> {
  ProviderLogin? providerLogin;
  final _formKey = GlobalKey<FormState>();
  

  @override
  Widget build(BuildContext context) {
    providerLogin ??= Provider.of<ProviderLogin>(context);

    return Scaffold(
      backgroundColor: GlobalColor.colorPrincipal,
      body: SafeArea(
          child: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              containerLogo(context),
              containerEmail(),
              containerPassword(),
              containerButtom(context),
            ],
          ),
        ),
      )),
    );
  }

  Widget containerLogo(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(
            radius: 50,
            backgroundColor: GlobalColor.colorPrincipal,
            child: Container(
              height: 100,
              width: 100,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(60.0),
              ),
              child: ClipRRect(
                  borderRadius: const BorderRadius.all(Radius.circular(50)),
                  child: Image(
                    image: AssetImage('assets/image/logounl.jpeg'),
                    width: 300,
                    fit: BoxFit.cover,
                    /* errorBuilder: (context, _, __) async {
                return Image.asset('assets/image/logo.png')
              },*/
                  ),
              ),
            )),
       /* CircleAvatar(
          radius: 30,
          child: Container(

            child: Image(
              image: AssetImage('assets/image/logounl.jpeg'),
              width: 200,
             *//* errorBuilder: (context, _, __) async {
                return Image.asset('assets/image/logo.png')
              },*//*
            ),
          ),
        ),*/
        Text(
          'Riego UNL',
          style: TextStyle(fontSize: 60, color: Colors.white, fontWeight: FontWeight.bold, fontFamily: 'logo'),
        ),
      ],
    );
  }

  Widget containerEmail() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextFormField(
          controller: providerLogin!.ediEmail,
          keyboardType: TextInputType.emailAddress,
          style: const TextStyle(),
          autovalidateMode: AutovalidateMode.onUserInteraction,
          decoration: const InputDecoration(
            hintText: 'Correo',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.email_outlined),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(50)),
            ),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50))),
          ),
          validator: (val) {
          String text = val!.trim();
          if (text.isEmpty) {
            return 'Ingrese un usuario';
          }
          return null;
        },
      ),
    );
  }

  Widget containerPassword() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextFormField(
          controller: providerLogin!.ediPassword,
          keyboardType: TextInputType.visiblePassword,
          style: const TextStyle(),
          autovalidateMode: AutovalidateMode.onUserInteraction,
          decoration: const InputDecoration(
            hintText: 'Clave',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.password),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(50)),
            ),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50))),
          ),
          validator: (val) {
          String text = val!.trim();
          if (text.isEmpty) {
            return 'Ingrese una contraseña';
          }
          return null;
        },
      ),
    );
  }

  Widget containerButtom(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(20),
      child: Column(
        children: [
          SizedBox(
            width: double.infinity,
            height: 45,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(primary: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))),
              onPressed: () {
                if(_formKey.currentState!.validate()){
                ApiRest().login(
                    context,  providerLogin!.ediEmail.text.trim(),providerLogin!.ediPassword.text.trim(), (t, data) {
                      if(t == 1){
                        GlobalPreference().setStateLogin(true);
                       // GlobalPreference().saveUser(data);
                        Navigator.of(context).pushNamedAndRemoveUntil(PageNavigation.routePage, (Route<dynamic> route) => false);
                      }
                });
                }else{
                  GlobalWidget().messageAlert(context,"Revise la información");
                }
              },
              child: const Text(
                'INICIAR SESIÓN',
                style: TextStyle(color: GlobalColor.colorPrincipal, fontSize: 20),
              ),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
/*          SizedBox(
            width: double.infinity,
            height: 45,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(primary: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))),
              onPressed: () {
                Navigator.of(context).pushNamed(PageRegister.routePage);
*//*                ApiRest().getUser(
                    context, (t, data) {
                  if(t == 1){

                  }
                });*//*
              },
              child: const Text(
                'REGISTRATE',
                style: TextStyle(color: GlobalColor.colorPrincipal, fontSize: 20),
              ),
            ),
          )*/
        ],
      ),
    );
  }
}
