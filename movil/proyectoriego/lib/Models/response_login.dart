import 'dart:convert';

class ResponseLogin {
  String? message;
  User? user;
  bool? status;

  ResponseLogin({
    this.message,
    this.user,
    this.status,
  });

  factory ResponseLogin.fromJson(String str) => ResponseLogin.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory ResponseLogin.fromMap(Map<String, dynamic> json) => ResponseLogin(
    message: json["message"],
    user: json["user"] == null ? null : User.fromMap(json["user"]),
    status: json["status"],
  );

  Map<String, dynamic> toMap() => {
    "message": message,
    "user": user?.toMap(),
    "status": status,
  };
}

class User {
  String? id;
  String? email;
  bool? status;
  Person? person;
  Rol? rol;

  User({
    this.id,
    this.email,
    this.status,
    this.person,
    this.rol,
  });

  factory User.fromJson(String str) => User.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory User.fromMap(Map<String, dynamic> json) => User(
    id: json["id"],
    email: json["email"],
    status: json["Status"],
    person: json["person"] == null ? null : Person.fromMap(json["person"]),
    rol: json["rol"] == null ? null : Rol.fromMap(json["rol"]),
  );

  Map<String, dynamic> toMap() => {
    "id": id,
    "email": email,
    "Status": status,
    "person": person?.toMap(),
    "rol": rol?.toMap(),
  };
}

class Person {
  String? nameU;
  String? lastName;

  Person({
    this.nameU,
    this.lastName,
  });

  factory Person.fromJson(String str) => Person.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Person.fromMap(Map<String, dynamic> json) => Person(
    nameU: json["nameU"],
    lastName: json["lastName"],
  );

  Map<String, dynamic> toMap() => {
    "nameU": nameU,
    "lastName": lastName,
  };
}

class Rol {
  String? nameRol;
  bool? status;

  Rol({
    this.nameRol,
    this.status,
  });

  factory Rol.fromJson(String str) => Rol.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Rol.fromMap(Map<String, dynamic> json) => Rol(
    nameRol: json["nameRol"],
    status: json["status"],
  );

  Map<String, dynamic> toMap() => {
    "nameRol": nameRol,
    "status": status,
  };
}