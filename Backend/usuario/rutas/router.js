const Router = require('express');
const router = Router();

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../middleware/validations');
const userCtl = require("../controllers/UserCtl");

//los endpoints aqui

router.get('/', (req, res) => {
    res.send("Modulo de Usuario");
});

//Estadio
router.post("/add", userCtl.InsertUser);
router.post("/update", validate_session,userCtl.UpdateUser);
router.post("/login", userCtl.loginUser);
router.post("/delete", validate_session, userCtl.deleteUser);
router.get("/get", userCtl.getUser);
router.get("/confirm", userCtl.confirmUser);
router.post("/")

module.exports = router;
