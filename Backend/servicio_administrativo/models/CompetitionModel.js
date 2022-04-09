const conexion = require("./db");

const Competition = function(competition){
    this.name = competition.name;
    this.champion_team = competition.champion_team;
    this.type = competition.type;
    this.year = competition.year;
    this.id_Country = competition.country; 
};

Competition.create = (newCompetition, result) => {
    conexion.query("INSERT INTO Competencia SET ?", newCompetition, (err,res) => {
        if(err){
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("se creo una nueva competencia: ", {id: res.insertId, ...newCompetition});
        result(null, {id: res.insertId, ...newCompetition});
    });
};


Competition.updateById = (id, competition, result) => {
    conexion.query(
      "UPDATE Competencia SET name = ?,champion_team = ?, type = ?, year = ?, id_Country = ? WHERE id_competencia = ?",
      [competition.name, competition.champion_team,competition.type, competition.year, competition.id_Country,id],
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
  
        console.log("competition updated successfully ", { id: id, ...competition });
        result(null, { id: id, ...competition });
      }
    );
};

Competition.getAll = (id, result) => {
    //let query = "SELECT * FROM Estadio";
    let query = ` select id_competencia,name, 
    champion_team, (Select name from Equipo where champion_team= id_team ) as winner
    , type,year, 
    id_Country, (select country FROM Country  c where c.id_Country = cc.id_Country ) as Country From Competencia cc`;

    if(id == ''){
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Competencias: ", res);
        result(null, res);
      });
    }else{
      query += ` WHERE id_competencia = ${id}`;
      conexion.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Competencia: ", res);
        result(null, res);
      });
    }
  };

Competition.remove = (id, result) => {
    conexion.query("DELETE FROM Competencia WHERE id_competencia = ?",id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "Error al eliminar competencia" }, null);
        return;
      }
      console.log("Operation completed successfully:", id);
      result(null, res);
    });
};


module.exports = Competition;



