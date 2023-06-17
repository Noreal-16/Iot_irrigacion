import 'dart:convert';

class ResponseUsuario {
  ResponseUsuario({
    this.message,
    this.data,
  });

  String? message;
  List<Datum>? data;

  factory ResponseUsuario.fromJson(String str) => ResponseUsuario.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory ResponseUsuario.fromMap(Map<String, dynamic> json) => ResponseUsuario(
        message: json["message"] == null ? null : json["message"],
        data: json["data"] == null ? null : List<Datum>.from(json["data"].map((x) => Datum.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "message": message == null ? null : message,
        "data": data == null ? null : List<dynamic>.from(data!.map((x) => x.toMap())),
      };
}

class Datum {
  Datum({
    this.id,
    this.email,
    this.password,
    this.status,
    this.person,
    this.rol,
    this.createdAt,
    this.updatedAt,
    this.v,
  });

  String? id;
  String? email;
  String? password;
  bool? status;
  Person? person;
  Rol? rol;
  DateTime? createdAt;
  DateTime? updatedAt;
  int? v;

  factory Datum.fromJson(String str) => Datum.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Datum.fromMap(Map<String, dynamic> json) => Datum(
        id: json["_id"] == null ? null : json["_id"],
        email: json["email"] == null ? null : json["email"],
        password: json["password"] == null ? null : json["password"],
        status: json["Status"] == null ? null : json["Status"],
        person: json["person"] == null ? null : Person.fromMap(json["person"]),
        rol: json["rol"] == null ? null : Rol.fromMap(json["rol"]),
        createdAt: json["createdAt"] == null ? null : DateTime.parse(json["createdAt"]),
        updatedAt: json["updatedAt"] == null ? null : DateTime.parse(json["updatedAt"]),
        v: json["__v"] == null ? null : json["__v"],
      );

  Map<String, dynamic> toMap() => {
        "_id": id == null ? null : id,
        "email": email == null ? null : email,
        "password": password == null ? null : password,
        "Status": status == null ? null : status,
        "person": person == null ? null : person!.toMap(),
        "rol": rol == null ? null : rol!.toMap(),
        "createdAt": createdAt == null ? null : createdAt!.toIso8601String(),
        "updatedAt": updatedAt == null ? null : updatedAt!.toIso8601String(),
        "__v": v == null ? null : v,
      };
}

class Person {
  Person({
    this.id,
    this.nameU,
    this.lastName,
    this.telephone,
    this.direction,
    this.createdAt,
    this.updatedAt,
    this.v,
  });

  String? id;
  String? nameU;
  String? lastName;
  String? telephone;
  String? direction;
  DateTime? createdAt;
  DateTime? updatedAt;
  int? v;

  factory Person.fromJson(String str) => Person.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Person.fromMap(Map<String, dynamic> json) => Person(
        id: json["_id"] == null ? null : json["_id"],
        nameU: json["nameU"] == null ? null : json["nameU"],
        lastName: json["lastName"] == null ? null : json["lastName"],
        telephone: json["telephone"] == null ? null : json["telephone"],
        direction: json["direction"] == null ? null : json["direction"],
        createdAt: json["createdAt"] == null ? null : DateTime.parse(json["createdAt"]),
        updatedAt: json["updatedAt"] == null ? null : DateTime.parse(json["updatedAt"]),
        v: json["__v"] == null ? null : json["__v"],
      );

  Map<String, dynamic> toMap() => {
        "_id": id == null ? null : id,
        "nameU": nameU == null ? null : nameU,
        "lastName": lastName == null ? null : lastName,
        "telephone": telephone == null ? null : telephone,
        "direction": direction == null ? null : direction,
        "createdAt": createdAt == null ? null : createdAt!.toIso8601String(),
        "updatedAt": updatedAt == null ? null : updatedAt!.toIso8601String(),
        "__v": v == null ? null : v,
      };
}

class Rol {
  Rol({
    this.id,
    this.nameRol,
    this.status,
    this.createdAt,
    this.updatedAt,
    this.v,
  });

  String? id;
  String? nameRol;
  bool? status;
  DateTime? createdAt;
  DateTime? updatedAt;
  int? v;

  factory Rol.fromJson(String str) => Rol.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Rol.fromMap(Map<String, dynamic> json) => Rol(
        id: json["_id"] == null ? null : json["_id"],
        nameRol: json["nameRol"] == null ? null : json["nameRol"],
        status: json["status"] == null ? null : json["status"],
        createdAt: json["createdAt"] == null ? null : DateTime.parse(json["createdAt"]),
        updatedAt: json["updatedAt"] == null ? null : DateTime.parse(json["updatedAt"]),
        v: json["__v"] == null ? null : json["__v"],
      );

  Map<String, dynamic> toMap() => {
        "_id": id == null ? null : id,
        "nameRol": nameRol == null ? null : nameRol,
        "status": status == null ? null : status,
        "createdAt": createdAt == null ? null : createdAt!.toIso8601String(),
        "updatedAt": updatedAt == null ? null : updatedAt!.toIso8601String(),
        "__v": v == null ? null : v,
      };
}
