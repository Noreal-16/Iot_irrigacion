'use strict';
const Person = require('../Models/Person');
const Account = require('../Models/Account');
const bcrypt = require('bcrypt');
const Rol = require('../Models/Rol');
/**
 * Metodo para Registrar Usuarios
 * @param req Peronsa Account
 * @param res Registrar Usuario
 * @constructor
 */
exports.RegisterAcounUser = (req, res) => {
    Rol.findOne({nameRol: 'Usuario'}).then((resultRol) => {
        if (!resultRol) {
            res.send({
                message: 'No se encontro Rol'
            })
        } else {
            const person = Person({
                nameU: req.body.nameU,
                lastName: req.body.lastName,
                telephone: req.body.telephone,
                direction: req.body.direction
            });
            person.save().then((result) => {
                if (result) {
                    try {
                        const passwordEncrypt = bcrypt.hashSync(req.body.password, 8);
                        const acount = Account({
                            email: req.body.email,
                            password: passwordEncrypt,
                            person: result._id,
                            rol: resultRol._id
                        });
                        acount.save().then((error) => {
                            if (error) {
                                return res.send({
                                    message: 'Error al guardar cuenta',
                                    error: error
                                });
                            }
                            return res.send({
                                message: 'cuenta registrada sactisfactoriamente',
                                person: person
                            })
                        })
                    } catch (e) {
                        return res.send({
                            message: "Error al crear la Account",
                            error: e,
                        });
                    }

                } else {
                    res.send({
                        message: 'persona no esta registrada ocurrio un error inesperado',
                    })
                }
            }).catch((error) => {
                return res.send({
                    message: 'error al registrar Peronsa',
                    error: error
                })
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Ocurrio un error en la consulta',
            error: error
        })
    })

}
/**
 * Metodo para buscar si el correo existe
 * @param req Correo por URL
 * @param res Account y persona
 */
exports.findEmailUsers = (req, res) => {
    Account.findOne({email: req.params.email}).populate(['person', 'rol']).exec((error, result) => {
        if (error) {
            return res.send(error)
        }
        if (result != null) {
            return res.send({
                message: 'Busqueda correcta!',
                data: result
            })
        } else {
            res.send({
                message: 'La busqueda realizada es null',
                data: result
            })
        }
    })
}
/**
 * Metodo para buscar si el correo existe
 * @param req Correo por URL
 * @param res Account y persona
 */
exports.findEmailUserDetails = (req, res) => {
    Account.findOne({email: req.params.email}).then((result) => {
        return res.send({
            message: 'Busqueda correcta!',
            data: result
        })
    }).catch((error) => {
        return res.send({
            message: 'Error en el servidor!',
            data: error
        })
    })
}
/**
 * Metodo para iniciar Sesion
 * @param req Email y Password
 * @param res Success Account y persona
 */
exports.loginUsr = (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegEx.test(email)) {
        return res.send({
            message: 'El Correo Ingresado es Incorrecto.',
            error: 'error'
        });
    } else {
        const isValidPassword = function (userpass, password) {
            return bcrypt.compareSync(password, userpass);
        };
        Account.findOne({email: email}).populate(['person', 'rol']).exec((error, result) => {
            if (error) {
                return res.send({
                    message: 'Error en la consulta Login',
                    error: error
                });
            }
            if (!result) {
                return res.send({
                    message: 'Usuario no encontrado',
                    error: 'error'
                })
            }
            if (!result.Status){
                return res.send({
                    message: '¡Cuenta desactivada! por favor Comunicarse con el administrador',
                    error: 'error'
                })
            }
            /**
             * Validacion de las claves
             */
            let compare = bcrypt.compareSync(password, result.password);
            if (!compare) {
                return res.send({
                    message: 'La contraseña es incorrecta'
                })
            }
            if (!isValidPassword(result.password, password)) {
                return res.send({
                    message: 'Clave incorrecta.'
                });
                /*res.send({
                    message: 'Clave incorrecta.'
                })*/
            }
            return res.send({
                message: 'Bienvenido al Sistema Riego',
                data: result
            })
        });
    }
}
/**
 * Funcion para buscar todos los usuarios registrados
 * @param req
 * @param res users
 * @constructor
 */
exports.FindUsers = (req, res) => {
    Account.find({}).populate(['person', 'rol']).exec((error, result) => {
        if (error) {
            res.send({
                message: 'Ocurrio un error inesperado en la consulta',
                data: error
            });
        }
        res.send({
            message: 'Success',
            data: result
        });
    })
}
/**
 * Metodo para actualizar usuario
 * @param req params.id
 * @param res user update
 * @constructor
 */
exports.UpdateUser = (req, res) => {
    Account.findById({_id: req.params.id}).populate(['person', 'rol']).exec((error, result) => {
        if (error) {
            res.send({
                message: 'Ocurrio un error inesperado al buscar Usuario',
                error: error
            })
        } else {
            res.send({
                message: 'Success',
                data: result
            })
        }

    })
}
/**
 * Metodo para buscar usuarios por id
 * @param req params.id
 * @param res user for id
 */
exports.findUserAcountId = (req, res) => {
    Account.findById(req.params.id).populate(['person', 'rol']).exec((error, result) => {
        if (error) {
            res.send({
                message: "Ocurrio un error en la consulta",
                error: error
            })
        } else {
            res.send({
                message: "Success",
                data: result
            })
        }

    })
}
/**
 * Update User Profile
 * @param req person ID and Account ID
 * @param res User Account Update
 */
exports.updateDataAccount = (req, res) => {
    Account.findById({_id: req.body.id}).then((result) => {
        Person.findById({_id: result.person}).then((resultU) => {
            resultU.nameU = req.body.nameU;
            resultU.lastName = req.body.lastName;
            resultU.telephone = req.body.telephone;
            resultU.direction = req.body.direction;
            resultU.save().then((resultUpdate) => {
                if (resultUpdate) {
                    result.email = req.body.email;
                    result.save().then((data) => {
                        if (data) {
                            res.send({
                                message: 'Usuario actualizado con exito',
                                data: data
                            })
                        }
                    }).catch((error) => {
                        res.send({
                            message: 'Error al actualizar Cuenta',
                            error: error
                        })
                    })
                }
            }).catch((error) => {
                res.send({
                    message: 'Error al actualizar Usuario',
                    error: error
                })
            })
        })
    })
}
/**
 * Update User Profile and ROL
 * @param req person ID and Account ID
 * @param res User Account Update
 */
exports.updateDataAccountRol = (req, res) => {
    Account.findById({_id: req.body.id}).then((result) => {
        Person.findById({_id: result.person}).then((resultU) => {
            resultU.nameU = req.body.nameU;
            resultU.lastName = req.body.lastName;
            resultU.telephone = req.body.telephone;
            resultU.direction = req.body.direction;
            resultU.save().then((resultUpdate) => {
                if (resultUpdate) {
                    result.email = req.body.email;
                    result.save().then((data) => {
                        if (data) {
                            res.send({
                                message: 'Usuario actualizado con exito',
                                account: data,
                                person: resultUpdate,
                            })
                        }
                    }).catch((error) => {
                        res.send({
                            message: 'Error al actualizar Cuenta',
                            error: error
                        })
                    })
                }
            }).catch((error) => {
                res.send({
                    message: 'Error al actualizar Usuario',
                    error: error
                })
            })

        }).catch((error) => {
            res.send({
                message: 'Error en el servidor Persona, por favor comunicarse con el Administrador',
                error: error
            })
        })
    }).catch((error) => {
        res.send({
            message: 'Error en el servidor Rol, por favor comunicarse con el Administrador',
            error: error
        })
    })
}
/**
 * Metodo para actualizar la contrasenia
 * @param req cuenta
 * @param res passwordUpdate
 * @constructor
 */
exports.ChangePasswordUser = (req, res) => {
    Account.findById({_id: req.params.id}).then((result) => {
        try {
            let compare = bcrypt.compareSync(req.body.password, result.password);
            if (compare) {
                try {
                    const passwordEncrypt = bcrypt.hashSync(req.body.passwordUpdate, 8);
                    result.password = passwordEncrypt;
                    result.save().then((dataUpdate) => {
                        res.send({
                            message: 'Contraseña actualizada correctamente'
                        })
                    }).catch((error) => {
                        res.send({
                            message: 'Ocurrio un error al actualizar la contraseña',
                            error: error
                        })
                    })
                } catch (e) {
                    res.send({
                        message: 'Ocurrio un error al encriptar la contraseña',
                        error: e
                    })
                }
            } else {
                res.send({
                    message: 'La contraseña es incorrecta',
                    error: 'Password is incorrect'
                })
            }
        } catch (e) {
            res.send({
                message: 'Error en la comparación',
                error: e
            })
        }


    })

}
/**
 * metodo para consultar los roles registrados
 * @param req
 * @param res roles
 */
exports.findRolsusers = (req, res) => {
    Rol.find({}).then((result) => {
        if (result) {
            res.send({
                message: 'Consulta de roles correcta',
                data: result
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Error al consultar roles',
            error: error
        })
    })
}
/**
 * Metodo para actualizar Rol
 * @param req params.id
 * @param res update rol
 * @constructor
 */
exports.UpdateRolUser = (req, res) => {
    Account.findById({_id: req.params.id}).then((result) => {
        if (result) {
            result.rol = req.body.rol
            result.save().then((updateRol) => {
                res.send({
                    message: 'Rol Actualizado Correctamente',
                    data: updateRol
                })
            }).catch((error) => {
                res.send({
                    message: 'Error al actualizar Rol',
                    error: error
                })
            })
        }
    }).catch((error) => {
        res.send({
            message: 'Error de servidor por favor comunicarse con el desarrollador',
            error: error
        })
    })
}
/**
 * Metodo para dar de baja a los usuarios
 * @param req params.id usuerio
 * @param res status false user
 */
exports.deleteUsers = (req, res) => {
    Account.findById({_id: req.params.id}, (err, result) => {
        if (err) {
            res.status(404).send({message: `Ocurrio un error en la consulta ${err}`})
        }
        if (result && result.Status) {
            result.Status = false
            result.save().then((resultDelete)=>{
                res.status(200).send({message: 'Usuario Eliminado Correctamente', resultDelete})
            }).catch((err)=>{
                res.status(400).send({message: 'Ocurrio un error al eliminar al usuario', err})
            })
        }
    })
}
