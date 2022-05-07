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
                return {status:200,msg:"Membresía comprada con éxito.",data:[]};
            }
        }catch(error){
            console.log(error);
            return {status:400,msg:"Error al obtener membresia."};
        }
}

async function cancelMembership(id_client){
    
    const query = `UPDATE Usuario SET membership = 0 WHERE id_user = ${id_client};`;
    try{
        const result = await executeQ(query);
        if(result.affectedRows == 1){
            return {status:200,msg:"Membresía cancelada con éxito.",data:[]};
        }
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al cancelar membresía.",data:[]};
    }
}


async function followTeam(id_client,id_team){
    const query = `INSERT INTO Equipos_Seguidos ( id_usuario, id_team )    
    VALUES (${id_client},${id_team});`;

    try{
        const result = await executeQ(query);
        if(result.affectedRows == 1){
            return {status:200,msg:"Ahora estas siguiendo al equipo."};
        }
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al seguir al equipo."};
    }
}

async function getNotifications(id_team){
    const query = `Select e.id_team , e.name , n.id_new, n.news as 'content'  from Equipo e 
    Join Noticia n 
    On e.id_team  = n.Equipo_id_team
    Where e.id_team = ${id_team};`;

    try{
        const result = await executeQ(query); 
        
            return {status:200,msg:"Se envia las notificaciones.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al seguir al equipo.",data:[]};
    }
}




async function setQuinielaResult(id_game,id_client,result_1,result_2){
    const query = `INSERT INTO QuinielaDetail
    (id_quiniela, id_client, result_1, result_2)
    SELECT q.id,${id_client},${result_1},${result_2} From Quiniela q
    WHERE id_partido = ${id_game};`;

    try{
        const result = await executeQ(query); 
        console.log(result);
        if(result.affectedRows == 1){
            return {status:200,msg:"Estado de la quiniela actualizada.",data:[]};
        }else if(result.affectedRows == 0){
            return {status:400,msg:"Error al guardar la quiniela. No fue posible validar todos los datos.",data:[]};
        }
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al guardar la quiniela.",data:[]};
    }
}

async function getTeamPersons(id_team,player){
    if(player == 1){
        var query = `SELECT p.id_person as 'id', p.name, p.lastname, 
        c.nicename as 'nationality',p.photo, po.stand as 'position'
        FROM Person p
        Join Equipo e 
        On e.id_team = p.id_team
        Join Country c 
        ON c.id_Country = p.nationality
        Join Posicion po 
        On p.id_stand = po.id_stand 
        WHERE p.id_team=${id_team} and status = 'Jugador';`;
    }else if(player == 0){
        var query = `SELECT p.id_person as 'id', p.name, p.lastname, 
        c.nicename as 'nationality',p.photo, po.stand as 'position'
        FROM Person p
        Join Equipo e 
        On e.id_team = p.id_team
        Join Country c 
        ON c.id_Country = p.nationality
        Join Posicion po 
        On p.id_stand = po.id_stand 
        WHERE p.id_team=${id_team} and status != 'Jugador';`;

    }
    

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Jugadores o técnico del equipo obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al obtener los jugadores o técnico del equipo.",data:[]};
    }
}

async function getPersonsHigher(age,player){
    if(player == 1){
        var query = `Select p.id,p.name,p.lastname,p.photo ,ps.stand as 'position',
        c.nicename as 'nationality',e.name as 'team', p.age
        From(
        SELECT id_person as 'id', name, 
        lastname , photo, id_team,
        TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
        status, nationality, id_stand  
        FROM Person) as p
        Join Posicion ps
        On ps.id_stand = p.id_stand 
        Join Country c 
        On c.id_Country = p.nationality
        Join Equipo e 
        On e.id_team = p.id_team
        Where p.age > ${age} and p.status = 'Jugador';`;
    }else if(player == 0){
        var query = `Select p.id,p.name,p.lastname,p.photo ,ps.stand as 'position',
        c.nicename as 'nationality',e.name as 'team', p.age
        From(
        SELECT id_person as 'id', name, 
        lastname , photo, id_team,
        TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
        status, nationality, id_stand  
        FROM Person) as p
        Join Posicion ps
        On ps.id_stand = p.id_stand 
        Join Country c 
        On c.id_Country = p.nationality
        Join Equipo e 
        On e.id_team = p.id_team
        Where p.age > ${age} and p.status != 'Jugador';`;

    }
    

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Jugadores o técnicos mayores a x años obtenidos con éxito.",data:result};
        
    }catch(error){
        return {status:400,msg:"Error al obtener los jugadores o técnicos mayores a x años.",data:[]};
    }
}


async function getPersonsLower(age,player){
    if(player == 1){
        var query = `Select p.id,p.name,p.lastname,p.photo ,ps.stand as 'position',
        c.nicename as 'nationality',e.name as 'team', p.age
        From(
        SELECT id_person as 'id', name, 
        lastname , photo, id_team,
        TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
        status, nationality, id_stand  
        FROM Person) as p
        Join Posicion ps
        On ps.id_stand = p.id_stand 
        Join Country c 
        On c.id_Country = p.nationality
        Join Equipo e 
        On e.id_team = p.id_team
        Where p.age < ${age} and p.status = 'Jugador';`;
    }else if(player == 0){
        var query = `Select p.id,p.name,p.lastname,p.photo ,ps.stand as 'position',
        c.nicename as 'nationality',e.name as 'team', p.age
        From(
        SELECT id_person as 'id', name, 
        lastname , photo, id_team,
        TIMESTAMPDIFF(YEAR,birthday ,CURDATE()) AS age,
        status, nationality, id_stand  
        FROM Person) as p
        Join Posicion ps
        On ps.id_stand = p.id_stand 
        Join Country c 
        On c.id_Country = p.nationality
        Join Equipo e 
        On e.id_team = p.id_team
        Where p.age < ${age} and p.status != 'Jugador';`;

    }
    
    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Jugadores o técnicos menores a x años obtenidos con éxito.",data:result};
        
    }catch(error){
        return {status:400,msg:"Error al obtener los jugadores o técnicos menores a x años.",data:[]};
    }
}

async function getCompetitionTeams(id_competition){
    const query = `Select id_team,team, photo, id_competition
    From(
    SELECT c.id_competencia as 'id_competition',
    c.name as 'name_competicion',
    e.id_team ,e.name as 'team',e.photo
    From Competencia c 
    Join Partido p 
    On p.id_competicion = c.id_competencia
    Join Equipo e 
    On (e.id_team = p.id_team_local  || e.id_team = p.id_team_visiting)
    Where c.id_competencia = ${id_competition}) t
    Group By id_competition,photo, id_team,team ;`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Equipos que participaron en una competición obtenidos con éxito.",data:result};
        
    }catch(error){
        return {status:400,msg:"Error al obtener los equipos que participaron en una competición.",data:[]};
    }
}

async function getCountryTeams(id_country){
    const query = `Select e.id_team,e.name as 'team', 
    c.id_Country as 'id_country' , e.photo 
    From Equipo e
    Join Country c 
    On e.id_Country = c.id_Country 
    Where e.id_Country = ${id_country};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Equipos de un país obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al obtener los equipos de un país.",data:[]};
    }
}

async function getTeamsByAge(age){
    const query = `Select e.id_team,e.team,e.photo,e.fundation_date as 'foundation_date'
    From(
    SELECT id_team, name as 'team', photo, fundation_date,
    TIMESTAMPDIFF(YEAR,fundation_date ,CURDATE()) AS age
    FROM Equipo) as e
    Where e.age  = ${age};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Equipos con x años de antigüedad obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar a los equipos.",data:[]};
    }
}


async function getCountryStadiums(id_country){
    const query = `Select e.id_Estadio as 'id_stadium' ,e.name  as 'stadium', c.id_Country as 'id_country', e.photo 
    From Estadio e
    Join Country c 
    On e.id_Country = c.id_Country 
    Where e.id_Country = ${id_country};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Estadios de un país obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al obtener los estadios de un país.",data:[]};
    }
}

async function getStadiumsByCapacity(capacity){
    const query = `Select e.id_Estadio as 'id_stadium' ,e.name  as 'stadium', e.photo,
    e.capacity as 'capacity', c.nicename as 'country'
    From Estadio e
    Join Country c
    On e.id_Country = c.id_Country
    Where e.capacity  <= ${capacity};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Estadios con capacidad menor o igual a x obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al obtener los estadios con capacidad menor o igual a x.",data:[]};
    }
}

async function getTeamHistory(id_team){
    const query = `Select p.id_partido as 'id', p.game_date,p.attendees,
    p.result_local , p.result_visiting , 1 as 'status',
    p.id_stadium ,e2.name as 'stadium', 
    p.id_team_local , el.name as 'team_local',
    el.photo as 'photo_local',
    p.id_team_visiting , ev.name as 'team_visiting',
    ev.photo as 'photo_visiting'
    From Equipo el
    Join Partido p 
    On p.id_team_local = el.id_team
    Join Estadio e2 
    On p.id_stadium = e2.id_Estadio
    Join Equipo ev
    On p.id_team_visiting = ev.id_team 
    Where el.id_team = ${id_team}
    and p.state = 'finalizado'
    UNION ALL 
    Select p.id_partido as 'id', p.game_date,p.attendees,
    p.result_local , p.result_visiting , 1 as 'status',
    p.id_stadium ,e2.name as 'stadium', 
    p.id_team_local , el.name as 'team_local',
    el.photo as 'photo_local',
    p.id_team_visiting , ev.name as 'team_visiting',
    ev.photo as 'photo_visiting'
    From Equipo el
    Join Partido p 
    On p.id_team_local = el.id_team
    Join Estadio e2 
    On p.id_stadium = e2.id_Estadio
    Join Equipo ev
    On p.id_team_visiting = ev.id_team 
    Where ev.id_team = ${id_team}
    and p.state = 'finalizado';`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Histórico de partidos del equipo x obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al obtener el histórico de partidos del equipo x.",data:[]};
    }
}

async function getHistoryPTeams(id,player){
    if(player == 1){
        var query = `Select DISTINCT *
    From (Select t_o.team_origin as 'id_team', 
    e.name as'team',e.photo,c.nicename as 'country'
    From Person p
    Join Transferencias t_o
    On p.id_person = t_o.Person_id
    Join Equipo e
    On e.id_team = t_o.team_origin
    Join Country c 
    on e.id_Country = c.id_Country 
    Where p.id_person = ${id} and p.status = 'Jugador'
    UNION ALL
    Select t_d.team_destination as 'id_team', 
    e.name as'team',e.photo,c.nicename as 'country'
    From Person p
    Join Transferencias t_d
    On p.id_person = t_d.Person_id
    Join Equipo e
    On e.id_team = t_d.team_origin
    Join Country c 
    on e.id_Country = c.id_Country 
    Where p.id_person = ${id} and p.status = 'Jugador'
    UNION ALL 
    Select e.id_team as 'id_team', e.name as'team',
    e.photo,c.nicename as 'country'
    From Person p
    Join Equipo e
    On e.id_team = p.id_team
    Join Country c 
    on e.id_Country = c.id_Country 
    Where p.id_person = ${id} and p.status = 'Jugador') r ;`;
    }else if(player == 0){
        var query = `Select DISTINCT *
        From (Select t_o.team_origin as 'id_team', 
        e.name as'team',e.photo,c.nicename as 'country'
        From Person p
        Join Transferencias t_o
        On p.id_person = t_o.Person_id
        Join Equipo e
        On e.id_team = t_o.team_origin
        Join Country c 
        on e.id_Country = c.id_Country 
        Where p.id_person = ${id} and p.status != 'Jugador'
        UNION ALL
        Select t_d.team_destination as 'id_team', 
        e.name as'team',e.photo,c.nicename as 'country'
        From Person p
        Join Transferencias t_d
        On p.id_person = t_d.Person_id
        Join Equipo e
        On e.id_team = t_d.team_origin
        Join Country c 
        on e.id_Country = c.id_Country 
        Where p.id_person = ${id} and p.status != 'Jugador'
        UNION ALL 
        Select e.id_team as 'id_team', e.name as'team',
        e.photo,c.nicename as 'country'
        From Person p
        Join Equipo e
        On e.id_team = p.id_team
        Join Country c 
        on e.id_Country = c.id_Country 
        Where p.id_person = ${id} and p.status != 'Jugador') r ;`;
    }
    

    try{
        const result = await executeQ(query); 
        
        return {status:200,msg:"Equipos en los que ha estado o dirigido x obtenidos con éxito.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
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
        
        return {status:200,msg:"Se devolvio los partidos.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
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
        return {status:200,msg:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
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
        return {status:200,msg:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
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
        return {status:200,msg:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
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
        return {status:200,msg:"Se devolvio los partidos.",data:result};
    }catch(error){
        console.log(error);
        return {status:400,msg:"Error al buscar los partidos.",data:[]};
    }
}

function encryptPassword(password){
    const crypto = require('crypto');
    let hash = crypto.createHash('md5').update(password).digest("hex");
    return hash;
}



function urlEncoded(text){
    const encoded = encodeURIComponent(text);
    return encoded;
}

function urlDecoded(text){
    const decoded = decodeURIComponent(text);
    return decoded;
}


function calcularAnios(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }

function getResponse(code,message,data){
    return JSON.stringify({status:code,msg:message,data:data});
}
module.exports = {
    getCountries,
    obtainMembership,
    cancelMembership,
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
    getBetweenXY,
    encryptPassword,
    urlEncoded,
    urlDecoded,
    calcularAnios
}