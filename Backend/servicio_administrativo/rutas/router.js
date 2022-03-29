const Router = require('express');
const router = Router();
const estadioCtl = require('../controllers/StadiumCtl');
const teamCtl = require('../controllers/TeamCtl');
const soccerGameCtl = require('../controllers/Soccer_GameCtl');
const transferenciaCtl = require('../controllers/TransferLogCtl');
const IndicediciaCtl = require('../controllers/IncidenciaCtl');
const competitionCtl = require('../controllers/CompetitionCtl');
const transferCtl = require('../controllers/TransferCtl');

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../middleware/validations');
const { getAll } = require('../models/StadiumModel');

router.get('/', (req, res) => {
    res.send("Modulo de Servicios Administrativos");
});

//Estadio 
router.post("/stadium",validate_session, estadioCtl.create);
router.put("/stadium",validate_session, estadioCtl.update);
router.delete("/stadium/",validate_session, estadioCtl.delete);
router.get("/stadium",validate_session,estadioCtl.findAll);

//Equipo
router.post("/team",validate_session, teamCtl.create);
router.put("/team",validate_session, teamCtl.update);
router.get("/team",validate_session,teamCtl.findAll);
router.delete("/team/",validate_session, teamCtl.delete);

//Partido
router.post("/soccer-game",validate_session, soccerGameCtl.create);
router.put("/soccer-game",validate_session, soccerGameCtl.update);
router.get("/soccer-game",validate_session,soccerGameCtl.findAll);
router.delete("/soccer-game/",validate_session, soccerGameCtl.delete);

//Transferencia
router.get("/transfer-log-coach", transferenciaCtl.getTransefernces);

//Incidencias
router.post("/add-incidence", IndicediciaCtl.InsertTransefernces);
router.post("/update-state", IndicediciaCtl.UpdateStatePerson);

//Noticias
router.post("/notice", IndicediciaCtl.InsertNew);
router.get("/notice", IndicediciaCtl.getNoticias);

//Competencia
router.post("/competition",validate_session, competitionCtl.create); //http://localhost:5000/servicio_administrativo/competition
router.put("/competition",validate_session, competitionCtl.update); //http://localhost:5000/servicio_administrativo/competition
router.get("/competition",validate_session,competitionCtl.findAll); //http://localhost:5000/servicio_administrativo/competition?id=5
router.delete("/competition/",validate_session, competitionCtl.delete); //http://localhost:5000/servicio_administrativo/competition/?id=4

router.post("/transfer-player",validate_session,transferCtl.create);
router.get("/transfer-log",validate_session,transferCtl.findAll);
router.post("/transfer-coach",validate_session,transferCtl.create);

module.exports = router;
