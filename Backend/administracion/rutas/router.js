const Router = require("express");
const router = Router();
const PersonaCtl = require("../controllers/PersonaCtl");
const BitacoraCtl = require("../controllers/BitacoraCtl");
const ReporteCtl = require("../controllers/ReporteCtl");

router.get("/", (req, res) => {
  res.send(
    "Modulo de Administración se actualiza solo, con los nuevos cambios"
  );
});

//Persona
router.post("/persona", PersonaCtl.create);
router.put("/persona", PersonaCtl.update);
router.put("/persona", PersonaCtl.updateUser);
router.get("/persona", PersonaCtl.findAll);
router.delete("/persona/", PersonaCtl.delete);
router.delete("/users/delete", PersonaCtl.deleteUser);
//Listas
router.get("/country", PersonaCtl.getCountrys);
router.get("/team", PersonaCtl.getTeams);
router.get("/stand", PersonaCtl.getStands);
router.get("/users", PersonaCtl.getUsers);

//Bitacora
router.post("/reporte/log", BitacoraCtl.create);
router.get("/reporte/log", BitacoraCtl.findAll);


//endpoint usuarios
router.get("/report/3",ReporteCtl.expenses);
router.get("/report/5",ReporteCtl.country);
router.get("/report/6",ReporteCtl.genre);
router.get("/report/7",ReporteCtl.age);
router.get("/report/8",ReporteCtl.news);

//endpoint Bitacora esb
router.get('/report/10',BitacoraCtl.findId);
router.get('/report/9/',ReporteCtl.newsByTeam);

module.exports = router;
