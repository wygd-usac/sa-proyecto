const Router = require("express");
const router = Router();
const QuinielaCtl = require("../controllers/QuinielaCtl");

//middleware para validar rutas y permisos
//const {validate_session,validate_premium} = require('../../middleware/validations');

router.get("/", (req, res) => {
  res.send("Modulo de Prediccion");
});

//Reporte
router.post("/quiniela", QuinielaCtl.create);

module.exports = router;
