const conexion = require("./db");

Reporte.suscribeByTeam = (id, result) => {
  conexion.query(
    `select e.name as equipo, u.id_user, u.name, u.lastname
        from Usuario u
        join Equipos_Seguidos es on u.id_user = es.id_usuario
        join Equipo e on es.id_team = e.id_team
        where e.id_team= ?`,
    id,
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

      console.log("Suscritos a Equipo  ", { id: id });
      result(null, res);
    }
  );
};

module.exports = Reporte;
