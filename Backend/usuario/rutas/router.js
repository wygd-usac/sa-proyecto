const Router = require('express');
const router = Router();

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../middleware/validations');
const userCtl = require("../controllers/UserCtl");
const {verifyUser} = require("../models/UserCtl");

//los endpoints aqui

router.get('/', (req, res) => {
    res.send("Modulo de Usuario");
});

router.post("/add",   function (req, res) {
    userCtl.InsertUser
});
//router.post("/update", validate_session,userCtl.UpdateUser);
//router.post("/delete", validate_session, userCtl.deleteUser);
//router.get("/login", userCtl.loginUser);
//router.get("/get", validate_session, userCtl.getUser);
//router.post("/confirm", verifyUser, userCtl.confirmUser);


module.exports = router;
