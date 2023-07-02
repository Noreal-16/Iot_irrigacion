import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Controller/provider_register.dart';
import 'package:proyectoriego/Util/global_color.dart';
import 'package:proyectoriego/Util/global_text.dart';
import 'package:proyectoriego/Util/global_widget.dart';

class PageCuidado extends StatelessWidget {
  static const routePage = 'viewCuidado';
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
              child: Text("Cuidado"),
            )
          ],
        ),
      )),
    );
  }
}
