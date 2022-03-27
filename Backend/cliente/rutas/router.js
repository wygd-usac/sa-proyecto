const Router = require('express');
const router = Router();
const dataOp = require('../data/dataOp');
//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../middleware/validations');



//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------


router.get('/',validate_session,validate_premium, (req, res) => {
    //console.log(req.body.data);
    res.send("Modulo de Cliente");
});

router.patch('/membership',validate_session,async (req,res) => {
    const {id_client} = req.body;
    if(id_client == undefined){
        res.send( dataOp.getResponse(400,"Error al obtener membresia."));
    }
    const result = await dataOp.obtainMembership(id_client);
    res.send(JSON.stringify(result));
});

router.post('/send-reset-email',validate_session,async (req,res) => {
    const {id_client} = req.body;
    if(id_client == undefined){
        res.send(dataOp.getResponse(400,"Error al reestablecer la clave."));
    }
    /*
    
    
    */

    const result = dataOp.getResponse(200,"Se ha enviado un correo para reestablecer la clave.");
    res.send(JSON.stringify(result));
});

router.post('/reset',validate_session,async (req,res) => {
    const {id_client,new_pass} = req.body;
    if(id_client == undefined || new_pass == undefined){
        res.send(dataOp.getResponse(400,"Error al reestablecer la clave."));
    }
    /*
    
    
    */

    const result =  dataOp.getResponse(200,"Se ha enviado un correo para reestablecer la clave.");
    res.send(JSON.stringify(result));
});

router.post('/follow',validate_session,async (req,res) => {
    const {id_client,id_team} = req.body;
    if(id_client == undefined || id_team == undefined){
        res.send(dataOp.getResponse(400,"Error al seguir un equipo."));
    }
    console.log(id_client);
    console.log(id_team);
    const result = await dataOp.followTeam(id_client,id_team);
    console.log(result);
    res.send(JSON.stringify(result));
});

router.get('/notifications',validate_session, async (req,res) => {
    const {id} = req.query;
    if(id == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(id);

    const result = await dataOp.getNotifications(id);
    res.send(result);
});

router.post('/quiniela',validate_session,async (req,res) => {
    const {id_client,id_game,result_1,result_2} = req.body;
    if(id_client == undefined || id_game == undefined || result_1 == undefined || result_2 == undefined){
        res.send(dataOp.getResponse(400,"Error al actualizar el estado de la quiniela."));
    }
    const result = await dataOp.setQuinielaResult(id_game,id_client,result_1,result_2);
    res.send(result);
});

//------------------------------delete team /esb/team/delete/:id
router.get('/reports/person/',validate_session,async (req,res)=>{
    const {id_team} = req.query;
    if(id_team == undefined){
        res.send(dataOp.getResponse(400,"Error en el id del equipo."));
    }
    console.log(id_team);
    const result = await dataOp.getTeamPersons(id_team);
    res.send(result);
});




router.get('/reports/person/higher/',validate_session,async (req,res) => {
    const {edad} = req.query;
    if(edad == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    //console.log(req.query);

    const result = await dataOp.getPersonsHigher(edad);
    res.send(result);
});



router.get('/reports/person/lower/',validate_session,async (req,res) => {
    const {edad} = req.query;
    if(edad == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getPersonsLower(edad);
    res.send(result);
});



router.get('/reports/competition/team/',validate_session,async (req,res) => {
    const {competicion} = req.query;
    if(competicion == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getCompetitionTeams(competicion);
    res.send(result);
});



router.get('/reports/country/team/',validate_session,async (req,res) => {
    const {pais} = req.query;
    if(pais == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getCountryTeams(pais);
    res.send(result);
});


//## Estadios en X país
router.get('/reports/country/stadium/',validate_session,async (req,res) => {
    const {pais} = req.query;
    if(pais == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getCountryStadiums(pais);
    res.send(result);
});

//## Estadios con capacidad menor o igual a X
router.get('/reports/stadium/capacity/',validate_session,async (req,res) => {
    const {capacidad} = req.query;
    if(capacidad == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getStadiumsByCapacity(capacidad);
    res.send(result);
});


//## Equipos segun antiguedad
router.get('/reports/team/age/',validate_session,async (req,res) => {
    const {edad} = req.query;
    if(edad == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getTeamsByAge(edad);
    res.send(result);
});



//## Histórico de partidos de X equipo
router.get('/reports/team/game/',validate_session,async (req,res) => {
    const {equipo} = req.query;
    if(equipo == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getTeamHistory(equipo);
    res.send(result);
});

//## Equipos en los que ha estado o dirigido X técnico o jugador
router.get('/reports/team/person/',validate_session,async (req,res) => {
    const {persona} = req.query;
    if(persona == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getHistoryPTeams(persona);
    res.send(result);
});


//## Partidos donde hubo al menos X goles
router.get('/reports/game/goal/',validate_session,async (req,res) => {
    const {goals} = req.query;
    if(goals == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);
    const result = await dataOp.getGamesWithGoals(goals);
    res.send(result);
});

//## Jugadores con más X incidencias en Y competición, (de Z año)
router.get('/reports/person/competition/incidents/',validate_session,async (req,res) => {
    const {competicion,anio} = req.query;
    if(competicion == undefined || anio == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getIncidentsCompetitionYear(competicion,anio);
    res.send(result);
});


//## Cantidad de X competiciones que ha ganado Y equipo
router.get('/reports/team/competitions',validate_session,async (req,res) => {
    const {equipo} = req.query;
    if(equipo == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getTotalCompetitionsWinning(equipo);
    res.send(result);
});

//## Listado de partidos en X año
router.get('/reports/games/year',validate_session,async (req,res) => {
    const {anio} = req.query;
    if(anio == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getGamesByYear(anio);
    res.send(result);
});



//## Listado de partidos entre X equipo contra Y equipo
router.get('/reports/games/teams',validate_session,async (req,res) => {
    const {local,visitante} = req.query;
    if(local == undefined || visitante == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getBetweenXY(local,visitante);
    res.send(result);
});
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
router.get('/listar',validate_session, (req, res) => {
    res.send("Modulo de Cliente");
});

router.get('/countries',validate_session,async (req,res) => {
    const countries = await dataOp.getCountries();
    //console.log(countries);
    res.send({'countries':countries});
});

module.exports = router;