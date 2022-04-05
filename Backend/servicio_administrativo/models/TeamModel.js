const conexion = require("./db");

const Team = function(team){
    this.name = team.name;
    this.fundation_date = team.fundation_date;
    this.id_Country = team.id_country; 
    this.photo = team.photo;
};

Team.create = (newTeam, result) => {
    conexion.query("INSERT INTO Equipo SET ?", newTeam, (err,res) => {
        if(err){
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("se creo un nuevo equipo: ", {id: res.insertId, ...newTeam});
        result(null, {id: res.insertId, ...newTeam});
    });
};

Team.updateById = (id, team, result) => {
    conexion.query(
      "UPDATE Equipo SET name = ?, fundation_date = ?, id_Country = ?,  photo = ? WHERE id_team = ?",
      [team.name, team.fundation_date, team.id_Country, team.photo, id],
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
  
        console.log("se actualizo el equipo especificado: ", { id: id, ...team });
        result(null, { id: id, ...team });
      }
    );
};

Team.getAll = (id, result) => {
    //let query = "SELECT * FROM Equipo";
    let query = `SELECT id_team,name, date_format(fundation_date,'%d/%m/%Y') as fundation_date,photo,
    id_Country, (select country FROM Country c where c.id_Country = e.id_Country limit 1) as country FROM Equipo e`;
    
    if(id == ''){
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Equipos: ", res);
        result(null, res);
      });
    }else{
      query += ` WHERE id_team = ${id}`;
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Equipos: ", res);
        result(null, res);
      });
    }
  };

  Team.remove = (id, result) => {
    conexion.query("DELETE FROM Equipo WHERE id_team = ?",id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "equipo no encontrado" }, null);
        return;
      }
      console.log("Se ha eliminado el equipo especificado: ", id);
      result(null, res);
    });
};

module.exports = Team;