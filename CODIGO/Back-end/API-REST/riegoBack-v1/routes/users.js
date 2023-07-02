const express = require('express');
const router = express.Router();
const passport = require('passport');
const accountController = require('../Controller/AccountController');
const RolController = require('../Controller/RolController');
const  cors = require('cors');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/**
 * Metodo para cambiar la contraseña
 */
router.post('/password/:id', accountController.ChangePasswordUser);
/**
 * Lista roles
 */
router.get('/rols', accountController.findRolsusers);
router.post('/update/rol/:id', accountController.UpdateRolUser);
/**
 *Registrar nuevo rol
 */
router.post('/rol', RolController.RegisterRol);

/**
 * Buscar usuario registrados
 */
router.get('/data/user', accountController.FindUsers);
/**
 * Actualizar Usuario
 */
router.get('/updateList/:id', accountController.UpdateUser);
router.get('/listUpdate/:id', accountController.findUserAcountId);
router.post('/updateAccount', accountController.updateDataAccount);
router.post('/accountRolUpdate', accountController.updateDataAccountRol);
/**
 * Eliminar Usuarios
 */
router.get('/delete/:id',accountController.deleteUsers);
/**
 * Usuarios registrados
 */
router.get('/user/:email', accountController.findEmailUsers);
router.get('/email/:email', accountController.findEmailUserDetails);
router.post('/register', accountController.RegisterAcounUser);

/**
 * Registro Usuario con Passport
 * @type {Router}
 */
router.get('/registry', (req, res) => {
    res.send({message: "El usuario se registro correctamente"});
})
router.get('/failure', (req, res) => {
    res.status(401).send({ error: req.flash("message")});
})

router.post('/signup', passport.authenticate('local-signup', {
    session: false,
    successRedirect: "/users/registry",
    failureRedirect: "/users/failure",
    failureFlash: true,
}));
/**
 * Iniciar Sesion con Passport
 */
router.get("/success",function (req, res) {
    console.log("El user ingresao es ", req.user)
    if (!req.isAuthenticated()){
        res.send({
            error: 'Autenticacion fallida error de servidor!',
            status: req.isAuthenticated()
        })
    }else {
        res.send({
            message: "El usuario se Inicio correctamente",
            user: req.user,
            status: true,
        });
    }
});
router.post('/signin' ,passport.authenticate('local-signin', {
        successRedirect: "/users/success",
        failureRedirect: "/users/failure",
        failureFlash: true,
    })
);
/**
 * Login Local
 */
router.post('/login', accountController.loginUsr);
/* GET logout. */
router.get('/salir', function (req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
        isSuper_Admin = false;
        isAdmin = false;
        res.redirect('/');
    });
});

module.exports = router;
