import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:proyectoriego/Controller/provider_principal.dart';
import 'package:proyectoriego/View/page_huerto.dart';

import '../Util/global_color.dart';
import '../Util/global_widget.dart';
import '../Util/mqttResponse.dart';

class PageNavigation extends StatefulWidget {
  static String routePage = 'viewHome';

  @override
  State<PageNavigation> createState() => _PageNavigationState();
}

class _PageNavigationState extends State<PageNavigation> {
  ProviderPrincipal? providerPrincipal;
  GlobalKey<ScaffoldState>? scaffoldKey = GlobalKey<ScaffoldState>();
  @override
  void initState() {
    super.initState();
    MqttHandler().initMqtt('0');
  }

  @override
  Widget build(BuildContext context) {
    providerPrincipal ??= Provider.of<ProviderPrincipal>(context);

    return Scaffold(
      backgroundColor: GlobalColor.colorPrincipal,
      key: scaffoldKey,
      appBar: AppBar(
        title: const Text("Riego UNL",style: TextStyle(color: Colors.white),),
        backgroundColor: GlobalColor.colorPrincipal,
        shape: const Border(bottom: BorderSide(color: Colors.orange, width:1)),
        elevation: 4,
        leading: IconButton(
          icon: const Icon(Icons.menu,color: Colors.white,),
          onPressed: (){
            scaffoldKey!.currentState!.openDrawer();
          },
        ),
      ),
      drawer: GlobalWidget().drawerPrincipal(context),
      body: SafeArea(
        child: PageHuerto(),
/*        PageView(
          controller: providerPrincipal!.pageController,
          physics: NeverScrollableScrollPhysics(),
          children: <Widget>[
            PageCuidado(),
            PageHureto(),
            PageEstadistica(),
          ],
        ),*/
      ),
      /*bottomNavigationBar: ConvexAppBar(
        style: TabStyle.reactCircle,
        color: Colors.black,
        activeColor: Colors.amber,
        items: const [
          TabItem(icon: Icons.flash_on_outlined, title: 'Cuidado'),
          TabItem(icon: Icons.night_shelter, title: 'Huerto'),
          TabItem(icon: Icons.balance, title: 'Estadisticas'),
        ],
        initialActiveIndex: providerPrincipal!.paginaActual,
        onTap: (int i) {
          print('indexItem $i');
          providerPrincipal!.paginaActual = i;
        },
      ),*/
    );
  }
}
