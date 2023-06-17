import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Controller/provider_register.dart';

class PageEstadistica extends StatelessWidget {
  static const routePage = 'viewEstadistica';
  ProviderRegister? providerRegister;

  @override
  Widget build(BuildContext context) {
    providerRegister ??= Provider.of<ProviderRegister>(context);

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: const [
              Center(
                child: Text("Estadistica"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
