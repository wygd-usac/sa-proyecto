const conexion = require("./db");

const Quiniela = function (quiniela) {
  this.team1_id = quiniela.team1_id; // visitante
  this.team2_id = quiniela.team2_id; // local
  this.goals_team1 = quiniela.goals_team1;
  this.goals_team2 = quiniela.goals_team2;
};

Quiniela.create = (quiniela, result) => {
  conexion.query(
    `insert into Quiniela (team_visitor_id, team_local_id, id_partido, goals_local, goals_visitor, status)
    values(
           ? , ? ,(select id_partido from Partido
                where id_team_local= ? and id_team_visiting= ?),
           ? , ? , 1
          )`,
    [
      quiniela.team1_id,
      quiniela.team2_id,
      quiniela.team2_id,
      quiniela.team1_id,
      quiniela.goals_team2,
      quiniela.goals_team1,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // no se encontró el id
        result({ kind: "Error al crear la quiniela" }, null);
        return;
      }

      console.log("Se creo la quiniela: ", { quiniela: quiniela });
      result(null, { Quiniela: quiniela });
    }
  );
};

module.exports = Quiniela;
