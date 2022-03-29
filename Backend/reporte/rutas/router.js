const Router = require("express");
const router = Router();
const ReporteCtl = require("../controllers/ReporteCtl");

//middleware para validar rutas y permisos
/* const {
  validate_session,
  validate_premium,
} = require("../../middleware/validations"); */

router.get("/", (req, res) => {
  res.send("Modulo de Reportes");
});

//Reporte
router.get("/suscribe", ReporteCtl.suscribe);
router.get("/membership", ReporteCtl.membership);
router.get("/memberships", ReporteCtl.memberships);
router.get("/expenses", ReporteCtl.expenses);
router.get("/country", ReporteCtl.country);
router.get("/genre", ReporteCtl.genre);
router.get("/age", ReporteCtl.age);
router.get("/news", ReporteCtl.news);
router.get("/news/team", ReporteCtl.newsByTeam);

module.exports = router;
