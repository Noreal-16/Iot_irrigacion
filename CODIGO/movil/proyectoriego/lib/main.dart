import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Controller/provider_login.dart';
import 'package:proyectoriego/Controller/provider_principal.dart';
import 'package:proyectoriego/Controller/provider_register.dart';
import 'package:proyectoriego/Util/mqttResponse.dart';
import 'package:proyectoriego/View/page_navigation.dart';
import 'package:proyectoriego/View/page_login.dart';
import 'package:proyectoriego/View/page_register.dart';
import 'package:proyectoriego/View/page_splash.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ProviderRegister()),
        ChangeNotifierProvider(create: (_) => ProviderLogin()),
        ChangeNotifierProvider(create: (_) => ProviderPrincipal()),
        ChangeNotifierProvider(create: (_) => MqttHandler()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Riego App',
        theme: ThemeData(
          useMaterial3: true,
          primarySwatch: Colors.green,
          bottomAppBarColor: Colors.white,
          bottomAppBarTheme: const BottomAppBarTheme(
            color: Colors.white
          )
        ),
        home: const PageSplash(),
        routes: <String, WidgetBuilder>{
          PageLogin.routePage: (_) => PageLogin(),
          PageRegister.routePage: (_) => PageRegister(),
          PageNavigation.routePage: (_) => PageNavigation(),
        },
      ),
    );
  }
}
