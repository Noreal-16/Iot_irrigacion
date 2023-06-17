import 'package:flutter/cupertino.dart';

class ProviderPrincipal extends ChangeNotifier {
  int _paginaActual = 1;
  late PageController _pageController = PageController(initialPage: 1);

  ProviderPrincipal();

  int get paginaActual => this._paginaActual;

  set paginaActual(int value) {
    this._paginaActual = value;
    pageController.animateToPage(value, duration: Duration(milliseconds: 500), curve: Curves.easeOut);
    notifyListeners();
  }

  PageController get pageController => this._pageController;

  void closeNavigation() {
    pageController.dispose();
  }
}
