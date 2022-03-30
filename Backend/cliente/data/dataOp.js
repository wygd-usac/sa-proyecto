const executeQ = require('./connection');

async function getCountries(){
    var query = 'SELECT * FROM Country;';
    const countries = await executeQ(query);
    const json_c = JSON.stringify(countries);
    //console.log(json_c);
    return json_c;
}

async function obtainMembership(id_client){
    
        const query = `UPDATE Usuario SET membership = 1 WHERE id_user = ${id_client};`;
        try{
            const result = await executeQ(query);
            if(result.affectedRows == 1){
                return {status:200,msj:"Ahora cuenta con una membresia."};
            }
        }catch(error){
            console.log(error);
            return {status:400,msj:"Error al obtener membresia."};
        }
}


async function followTeam(id_client,id_team){
    const query = `INSERT INTO Equipos_Seguidos ( id_usuario, id_team )    
    VALUES (${id_client},${id_team});`;

    try{
        const result = await executeQ(query);
        if(result.affectedRows == 1){
            return {status:200,msj:"Ahora estas siguiendo al equipo."};
        }
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo."};
    }
}

async function getNotifications(id_team){
    const query = `Select e.id_team , e.name , n.id_new  from Equipo e 
    Join Noticia n 
    On e.id_team  = n.Equipo_id_team
    Where e.id_team = ${id_team};`;

    try{
        const result = await executeQ(query); 
        
            return {status:200,msj:"Se envia las notificaciones.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}




async function setQuinielaResult(id_game,id_client,result_1,result_2){
    const query = `INSERT INTO QuinielaDetail
    (id_quiniela, id_client, result_1, result_2)
    SELECT q.id,${id_client},${result_1},${result_2} From Quiniela q
    WHERE id_partido = ${id_game};`;

    try{
        const result = await executeQ(query); 
        if(result.affectedRows == 1){
            return {status:200,msj:"Estado de la quiniela actualizada.",data:[]};
        }
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}

async function getTeamPersons(id_team){
    const query = `SELECT p.id_person, p.name, p.lastname, 
    p.photo, p.status as 'type', p.id_team, e.name 
    FROM Person p Join Equipo e On e.id_team = p.id_team 
    WHERE p.id_team=${id_team};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los integrantes del equipo.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}

async function getPersonsHigher(age){
    const query = `Select p.*,ps.stand as 'type'
    From(SELECT id_person, name, lastname , photo, 
    TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
    type as type_id FROM Person) as p
    Join Posicion ps
    On ps.id_stand = p.type_id 
    Where p.age > ${age};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los integrantes del equipo.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}


async function getPersonsLower(age){
    const query = `Select p.*,ps.stand as 'type'
    From(SELECT id_person, name, lastname , photo, 
    TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
    type as type_id FROM Person) as p
    Join Posicion ps
    On ps.id_stand = p.type_id 
    Where p.age < ${age};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los integrantes del equipo.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los jugadores/entrenaor.",data:[]};
    }
}

async function getCompetitionTeams(id_competition){
    const query = `Select id_competicion,name_competicion, id_team,name_team 
    From(
    SELECT c.id_competencia as 'id_competicion',
    c.name as 'name_competicion',
    e.id_team ,e.name as 'name_team'
    From Competencia c 
    Join Partido p 
    On p.id_competicion = c.id_competencia
    Join Equipo e 
    On (e.id_team = p.id_team_local  || e.id_team = p.id_team_visiting)
    Where c.id_competencia = ${id_competition}) t
    Group By id_competicion,name_competicion, id_team,name_team ;`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los equipos.",data:[]};
    }
}

async function getCountryTeams(id_country){
    const query = `Select e.id_team,e.name as 'name_team', 
    c.id_Country as 'id_country' , c.country as 'name_country' 
    From Equipo e
    Join Country c 
    On e.id_Country = c.id_Country 
    Where e.id_Country = ${id_country};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los equipos.",data:[]};
    }
}

async function getTeamsByAge(age){
    const query = `Select e.*
    From(
    SELECT id_team, name as 'name_team', 
    TIMESTAMPDIFF(YEAR,fundation_date ,CURDATE()) AS age
    FROM Equipo) as e
    Where e.age  = ${age};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los equipos.",data:[]};
    }
}


async function getCountryStadiums(id_country){
    const query = `Select e.id_Estadio as 'id_stadium' ,e.name  as 'name_stadium', c.id_Country as 'id_country', c.country as 'name_country' 
    From Estadio e
    Join Country c 
    On e.id_Country = c.id_Country 
    Where e.id_Country = ${id_country};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los equipos.",data:[]};
    }
}

async function getStadiumsByCapacity(capacity){
    const query = `Select e.id_Estadio as 'id_stadium' ,e.name  as 'name_stadium',
    e.capacity as 'capacidad'
    From Estadio e
    Where e.capacity  <= ${capacity};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar a los estadios.",data:[]};
    }
}

async function getTeamHistory(id_team){
    const query = `Select e.id_team , e.name as 'name_team',
    p.id_partido as 'id_game' , p.game_date as 'date_game',
    p.attendees as 'viewers', e_winner.name as 'winner',
    e2.id_Estadio as 'id_stadium' , e2.name as 'name_stadium',
    CONCAT(p.result_local, ' - ' , p.result_visiting) as 'result'
    From Equipo e
    Join Partido p 
    On p.id_team_local = e.id_team || p.id_team_visiting  = e.id_team
    Join Estadio e2 
    On p.id_stadium = e2.id_Estadio
    Join Equipo e_winner
    On p.id_winner = e_winner.id_team 
    Where e.id_team = ${id_team}
    and p.state = 'terminado';`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

async function getHistoryPTeams(id_person){
    const query = `Select p.id_person , CONCAT(p.name,' ',p.lastname) as 'name_person',
    t_o.team_origin as 'id_team', e.name as'name_team'
    From Person p
    Join Transferencias t_o
    On p.id_person = t_o.Person_id
    Join Equipo e
    On e.id_team = t_o.team_origin 
    Where p.id_person = ${id_person}
    UNION ALL
    Select p.id_person , CONCAT(p.name,' ',p.lastname) as 'name_person',
    t_d.team_destination  as 'id_team', e.name as'name_team'
    From Person p
    Join Transferencias t_d
    On p.id_person = t_d.Person_id
    Join Equipo e
    On e.id_team = t_d.team_destination  
    Where p.id_person = ${id_person};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los equipos de la competición.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

async function getGamesWithGoals(goals){
    const query = `Select * From(
        Select p.id_partido as 'id_game',
        p.result_local + result_visiting as 'goals',
        CONCAT(e_l.name, ' vs ',e_v.name) as 'name_game'
        From Partido p 
        Join Equipo e_l 
        On p.id_team_local = e_l.id_team 
        Join Equipo e_v 
        On p.id_team_visiting  = e_v.id_team
        ) games
        Where games.goals >= ${goals};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los partidos.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

async function getIncidentsCompetitionYear(competition,year){
    const query = `Select t.*, p.name, p2.id_competicion,
    c.name as 'name_competition', c.year 
    From(Select i.id_person,i.id_partido as 'id_game', 
    count(*) as 'total_incidents'  
    From Incidencia i 
    Group By i.id_person,i.id_partido) t
    Join Person p 
    On p.id_person = t.id_person
    Join Partido p2  
    On t.id_game = p2.id_partido
    Join Competencia c 
    On c.id_competencia = p2.id_competicion
    Where c.year = ${year}
    And c.id_competencia = ${competition};`;

    try{
        const result = await executeQ(query); 
        return {status:200,msj:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}


async function getTotalCompetitionsWinning(equipo){
    const query = `Select e.id_team, e.name, t.*
    From(Select 
    COUNT(*) as 'total_competitions'
    From Competencia c 
    Where c.id_winner = ${equipo}) t, Equipo e
    Where e.id_team = ${equipo};`;

    try{
        const result = await executeQ(query); 
        return {status:200,msj:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

async function getGamesByYear(year){
    const query = `Select * From(
        Select p.id_partido as 'id_game',
        YEAR(p.game_date) as 'year',
        CONCAT(e_l.name, ' vs ',e_v.name) as 'name_game'
        From Partido p 
        Join Equipo e_l 
        On p.id_team_local = e_l.id_team 
        Join Equipo e_v 
        On p.id_team_visiting  = e_v.id_team
        ) games
        Where games.year = ${year};`;

    try{
        const result = await executeQ(query); 
        return {status:200,msj:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

async function getBetweenXY(local,visitante){
    const query = `Select p.id_partido as 'id_game', 
    CONCAT(e_l.name,' vs ',e_v.name) as 'name_game',
    e_l.id_team as 'id_team_local',
    e_l.name as 'team_local',
    e_v.id_team as 'id_team_visit',
    e_v.name as 'team_visit',
    CONCAT(p.result_local, ' - ' , p.result_visiting) as 'result',
    p.game_date as 'date_game'
    From Partido p 
    Join Equipo e_l 
    On p.id_team_local = e_l.id_team 
    Join Equipo e_v 
    On p.id_team_visiting = e_v.id_team
    Where p.id_team_local = ${local}
    And p.id_team_visiting = ${visitante};`;

    try{
        const result = await executeQ(query); 
        return {status:200,msj:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al buscar los partidos.",data:[]};
    }
}

function getResponse(code,message,data){
    return JSON.stringify({status:code,msj:message,data:data});
}
module.exports = {
    getCountries,
    obtainMembership,
    followTeam,
    getResponse,
    getNotifications,
    setQuinielaResult,
    getTeamPersons,
    getPersonsHigher,
    getPersonsLower,
    getCompetitionTeams,
    getCountryTeams,
    getTeamsByAge,
    getCountryStadiums,
    getStadiumsByCapacity,
    getTeamHistory,
    getHistoryPTeams,
    getGamesWithGoals,
    getIncidentsCompetitionYear,
    getTotalCompetitionsWinning,
    getGamesByYear,
    getBetweenXY
}