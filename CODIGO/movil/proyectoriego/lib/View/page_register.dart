import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Api/api_rest.dart';
import 'package:proyectoriego/Controller/provider_register.dart';
import 'package:proyectoriego/Util/global_color.dart';
import 'package:proyectoriego/Util/global_text.dart';
import 'package:proyectoriego/Util/global_widget.dart';

class PageRegister extends StatelessWidget {
  static const routePage = 'routeRegister';
  ProviderRegister? providerRegister;

  @override
  Widget build(BuildContext context) {
    providerRegister ??= Provider.of<ProviderRegister>(context);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          'Registro',
          style: TextStyle(fontFamily: 'semibold'),
        ),
        backgroundColor: GlobalColor.colorPrincipal,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
            size: 18,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: SafeArea(
          child: SingleChildScrollView(
        child: Column(
          children: [containerInfo(), containerName(),containerLastName(),containerPhone(),containerDirecction(),containerEmail(),containerPassword(), containerButtom(context)],
        ),
      )),
    );
  }

  Widget containerInfo() {
    return Container(margin: const EdgeInsets.only(left: 20, right: 20, top: 20), child: GlobalWidget().textTitle(GlobalText.textRegister));
  }

  Widget containerName() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editName,
          keyboardType: TextInputType.text,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Nombre',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.person_outline),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
    );
  }
  Widget containerLastName() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editLastName,
          keyboardType: TextInputType.text,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Apellido',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.person_outline),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
    );
  }

  Widget containerPhone() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editCell,
          keyboardType: TextInputType.phone,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Celular',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.phone_android),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
    );
  }

  Widget containerDirecction() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editDirecction,
          keyboardType: TextInputType.text,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Dirección',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.directions),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
    );
  }

  Widget containerEmail() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editEmail,
          keyboardType: TextInputType.emailAddress,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Correo',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.email_outlined),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
    );
  }
  Widget containerPassword() {
    return Container(
      margin: const EdgeInsets.all(20),
      child: TextField(
          controller: providerRegister!.editPassword,
          keyboardType: TextInputType.visiblePassword,
          style: const TextStyle(),
          decoration: const InputDecoration(
            hintText: 'Clave',
            contentPadding: EdgeInsets.all(10),
            prefixIcon: Icon(Icons.password),
            fillColor: Colors.white,
            filled: true,
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(50)), borderSide: BorderSide(color: GlobalColor.colorEdge, width: .3)),
          )),
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
              style: ElevatedButton.styleFrom(primary: GlobalColor.colorPrincipal, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))),
              onPressed: () {
                ApiRest().register(
                    context,
                    providerRegister!.editName.text.trim(),
                    providerRegister!.editLastName.text.trim(),
                    providerRegister!.editCell.text.trim(),
                    providerRegister!.editDirecction.text.trim(),
                    providerRegister!.editEmail.text.trim(),
                    providerRegister!.editPassword.text.trim(), (t, data) {
                  if (t == 1) {
                    providerRegister!.editCell.clear();
                    providerRegister!.editName.clear();
                    GlobalWidget().messageAlert(context, data);
                    Navigator.of(context).pop();
                  }
                });
              },
              child: const Text(
                'REGISTRAR',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
