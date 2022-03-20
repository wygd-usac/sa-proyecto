const conexion = require("./db");

const Soccer_Game = function(soccer_game){
    this.game_date = soccer_game.game_date;
    this.attendees = soccer_game.attendees;
    this.result_local = soccer_game.result_local;
    this.result_visiting = soccer_game.result_visiting;
    this.state = soccer_game.state; 
    this.id_stadium = soccer_game.id_stadium;
    this.id_team_local = soccer_game.id_team_local;
    this.id_team_visiting = soccer_game.id_team_visiting;
    this.incidents = soccer_game.incidents;
};

Soccer_Game.create = (newSoccerGame, result) => {
    conexion.query("INSERT INTO Partido SET ?", newSoccerGame, (err,res) => {
        if(err){
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("se creo un nuevo partido: ", {id: res.insertId, ...newSoccerGame});
        result(null, {id: res.insertId, ...newSoccerGame});
    });
};

Soccer_Game.updateById = (id, soccer_game, result) => {
    conexion.query(
      "UPDATE Partido SET game_date = ?, attendees = ?, result_local = ?, result_visiting = ?, state = ?, incidents = ?, id_stadium = ? , id_team_local = ? , id_team_visiting = ? WHERE id_partido = ?",
      [soccer_game.game_date,soccer_game.attendees, soccer_game.result_local, soccer_game.result_visiting, soccer_game.state, soccer_game.incidents,soccer_game.id_stadium, soccer_game.id_team_local, soccer_game.id_team_visiting ,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // no se encontró el id
          result({ kind: "el id especificado no existe" }, null);
          return;
        }
  
        console.log("se actualizo el partido especificado: ", { id: id, ...soccer_game });
        result(null, { id: id, ...soccer_game });
      }
    );
};

Soccer_Game.getAll = (id, result) => {
    //let query = "SELECT * FROM Estadio";
    let query = "select id_partido,game_date,attendees,result_local, result_visiting,state,incidents,id_stadium,id_team_local, (Select name from Equipo where id_team_local = id_team) as team_local,id_team_visiting, (Select name from Equipo where id_team_visiting = id_team) as team_visiting From Partido";
  
    if(id == ''){
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Partidos: ", res);
        result(null, res);
      });
    }else{
      query += ` WHERE id_partido = ${id}`;
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Partidos: ", res);
        result(null, res);
      });
    }
  };

Soccer_Game.remove = (id, result) => {
    conexion.query("DELETE FROM Partido WHERE id_partido = ?",id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "partido no encontrado" }, null);
        return;
      }
      console.log("Se ha eliminado el partido especificado: ", id);
      result(null, res);
    });
};


module.exports = Soccer_Game;


