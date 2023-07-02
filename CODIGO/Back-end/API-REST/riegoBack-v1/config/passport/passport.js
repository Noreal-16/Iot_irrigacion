"use strict";
const bcrypt = require('bcrypt');
const Account = require('../../Models/Account');
const needle = require('needle');

module.exports = function (passport) {
    const LocalStrategy = require('passport-local').Strategy;
    const URL_LOCAL_CLIEN = "http://localhost:3000/";
    /**
     * Registro Usuario
     */
    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: "email", //lo que esta como name en el input del registro
                passwordField: "password", //lo que esta como name en el input del registro
                passReqToCallback: true,
            },
            function (req, email, password, done) {
                const nameU = req.body.nameU;
                const lastName = req.body.lastName;
                const telephone = req.body.telephone;
                const direction = req.body.direction;
                if (!email && !password && !nameU && !lastName && !telephone && !direction) {
                    req.flash('message', 'Datos incompletos se debe completar todos los campos');
                    return done(null, false, {message: 'Datos incompletos se debe completar todos los campos'});
                }
                const emailER = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                if (!emailER.test(email)) {
                    req.flash('message', 'El correo ingresado es incorrecto!')
                    return done(null, false, {message: 'El correo ingresado es incorrecto!'});
                }
                const nombreRegEx = /[a-zA-Z]/
                if (!nameU.match(nombreRegEx) && !lastName.match(nombreRegEx)) {
                    req.flash('message', 'Sus Nombres o Apellidos deben contener unicamente letras')
                    return done(null, false, {message: 'Sus Nombres o Apellidos deben contener unicamente letras'});
                }
                needle.get(URL_LOCAL_CLIEN + `users/user/${email}`, (error, result) => {
                    if (!error && result.statusCode == 200) {
                        if (result.body.data) {
                            req.flash('message', 'El correo ingresado ya se encuentra registrado');
                            return done(null, false, {message: 'El correo ingresado ya se encuentra registrado'});
                        } else {
                            const dataUser = {
                                nameU: req.body.nameU,
                                lastName: req.body.lastName,
                                telephone: req.body.telephone,
                                direction: req.body.direction,
                                email: req.body.email,
                                password: req.body.password
                            };
                            needle.post(URL_LOCAL_CLIEN + 'users/register', dataUser, {"Content-Type": "application/json"},
                                (error, resp) => {
                                    if (error) {
                                        done(null, error, {message: 'Error al registrar datos'});
                                    } else {
                                        return done(null, resp.body);
                                    }
                                })
                        }
                    } else {
                        req.flash('message', 'Error de Servidor');
                        return done(null, false, {message: 'Error de Servidor'});
                    }
                })
            })
    );
    /**
     * Login Passport
     */
    passport.use(
        'local-signin', new LocalStrategy(
            {
                usernameField: "email", //lo que esta como name en el input del registro
                passwordField: "password", //lo que esta como name en el input del registro
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            }, function (req, email, password, done){
                if (!email && !password){
                    req.flash('message', 'Los campos estan imcompletos');
                    return done(null, false, {message: 'Los campos estan imcompletos'});
                }
                const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                if (!emailRegEx.test(email)) {
                    req.flash('message', 'El Correo Ingresado es Incorrecto.');
                    return done(null, false, {
                        message: "El Correo Ingresado es Incorrecto",
                    });
                }
                const isValidPassword = function (userpass, password) {
                    try {
                        return bcrypt.compareSync(password, userpass);
                    }catch (e) {
                        console.log('error ', e)
                    }

                };
                Account.findOne({email:email}).populate(['person','rol']).exec((error, result)=>{
                    if (error){
                        res.send({
                            message: "Ocurrio un error al buscar usuario",
                            error:error
                        })
                        return done(null, false, { message: 'Ocurrio un error al buscar usuario' });
                    }
                    if(!result){
                        req.flash('message', 'El Correo no existe.');
                        return done(null, false, { message: 'Correo no existe' });
                    }
                    if(!result.Status){
                        req.flash('message', 'Su cuenta esta Desactivada.');
                        return done(null, false, {
                            message: "Su cuenta esta Desactivada.",
                        });
                    }
                    /**
                     * Validacion de las claves
                     */
                    let compare = bcrypt.compareSync(password, result.password);
                    if (!compare) {
                        req.flash("message", "La contraseña es incorrecta");
                        return done(null, false, {
                            message: "La contraseña es incorrecta"
                        });
                    }
                    if (!isValidPassword(result.password, password)) {
                        req.flash('message', 'Clave incorrecta.');
                        return done(null, false, { message: 'Clave incorrecta.' });
                    }
                    let verifyAdmin = (user)=>{
                        if (user){
                            const rol = 'Usuario';
                            const rolA = 'Administrador';
                            if (user.rol.nameRol === rol){
                                if(user.rol.nameRol === rolA){
                                    isSuper_Admin = true;
                                }else{
                                    isAdmin= true;
                                }
                            }
                            return false;
                        }
                    }
                    verifyAdmin(result);
                    const userInfo = result;
                    return done(null, userInfo)
                })
            })
    );
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, {
                id: user.id,
                email: user.email,
                Status: user.Status,
                person: {
                    nameU: user.person.nameU,
                    lastName: user.person.lastName,
                },
                rol:{
                    nameRol: user.rol.nameRol,
                    status: user.rol.status,
                }
            });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
};

